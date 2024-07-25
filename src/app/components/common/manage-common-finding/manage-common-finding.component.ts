import { Component } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CommonFinding } from '../../../models/shared/audit/common-finding';
import { StorageService } from 'app/services/shared/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'app/models/admin/user';
import { CommonFindingService } from 'app/services/shared/audit/common-finding.service';

@Component({
  selector: 'app-manage-common-finding',
  templateUrl: './manage-common-finding.component.html',
  styleUrls: ['./manage-common-finding.component.css'],
  providers: [MessageService],
})
export class ManageCommonFindingComponent {
  commonFinding: CommonFinding = new CommonFinding();
  commonFindings: CommonFinding[] = [];
  selectedFindings: CommonFinding[] = [];

  user: User = new User();

  findingEditDialog = false;

  outputFinding: any[] = [];
  isEditData = false;

  loading = true;

  constructor(
    private messageService: MessageService,
    private commonFindingService: CommonFindingService,
    private storageService: StorageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    const user_id = this.storageService.getUser().id;
    this.getCommonFinding(user_id);
  }

  onDataChange(data: any) {
    if (data[1]) {
      let user_id = this.storageService.getUser().id;
      this.getCommonFinding(user_id);
      this.commonFindings = [...this.commonFindings];
      this.findingEditDialog = false;
      this.commonFinding = new CommonFinding();
    } else {
      this.commonFindings[this.findIndexById(data[0].id)] = data[0];
    }
    this.findingEditDialog = false;
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.commonFindings.length; i++) {
      if (this.commonFindings[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  openNew() {
    this.outputFinding = [];
    this.commonFinding = new CommonFinding();
    this.isEditData = true;
    this.outputFinding.push(this.commonFinding);
    this.outputFinding.push(this.isEditData);
    this.findingEditDialog = true;
  }

  editFinding(finding: CommonFinding) {
    this.outputFinding = [];
    this.commonFinding = { ...finding };
    this.isEditData = false;
    this.outputFinding.push(this.commonFinding);
    this.outputFinding.push(this.isEditData);
    this.findingEditDialog = true;
  }

  deleteFinding(finding: CommonFinding) {
    this.user.id = this.storageService.getUser().id;
    finding.user = this.user;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected finding?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commonFindingService.deleteCommonFinding(finding.id).subscribe({
          next: (response) => {
            this.commonFindings = this.commonFindings.filter(
              (val) => val.id !== finding.id
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Finding Deleted',
              life: 3000,
            });
          },
          error: (error: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary:
                error.status == 401
                  ? 'You are not permitted to perform this action!'
                  : 'Something went wrong while deleteing common finding!',
              detail: '',
            });
          },
        });
      },
    });
  }

  deleteSelectedFindings() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected findings?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commonFindingService
          .deleteSelectedCommonFinding(this.selectedFindings)
          .subscribe({
            next: (response) => {
              this.commonFindings = this.commonFindings.filter(
                (val) => !this.selectedFindings.includes(val)
              );
              this.selectedFindings = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Findings Deleted',
                life: 3000,
              });
            },
            error: (error: HttpErrorResponse) => {
              this.messageService.add({
                severity: 'error',
                summary:
                  error.status == 401
                    ? 'You are not permitted to perform this action!'
                    : 'Something went wrong while deleting selected findings!',
                detail: '',
              });
            },
          });
      },
    });
  }

  getCommonFinding(id: any): void {
    this.commonFindingService.getCommonFinding(id).subscribe({
      next: (response) => {
        this.commonFindings = response;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while retriving common finding!',
          detail: '',
        });
      },
    });
  }
}
