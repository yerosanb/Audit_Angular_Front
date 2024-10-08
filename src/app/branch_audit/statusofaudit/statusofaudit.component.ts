import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Branches } from 'app/models/admin/branches';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BranchFinancialAudit } from '../model/branch-financial-audit';
import { Statusofaudit } from '../model/statusofaudit';
import { StatusofauditService } from './statusofaudit.service';

@Component({
  selector: 'app-statusofaudit',
  templateUrl: './statusofaudit.component.html',
  styleUrls: ['./statusofaudit.component.css'],
})
export class StatusofauditComponent implements OnInit {
  loading = true;
  audits: BranchFinancialAudit[];
  auditor = new User();
  audit = new BranchFinancialAudit();
  statusofAudit = new Statusofaudit();
  edit_auditee: Boolean = false;
  auditStatusDialog: boolean = false;
  statusofauditEditDialog: boolean = false;
  auditor_id!: any;
  selectedstatusofAudits: BranchFinancialAudit[] = [];
  branch = new Branches();
  findingDate = new Date();
  today: Date = new Date();
  ing=false;

  constructor(
    private service: StatusofauditService,
    private storageService: StorageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.auditor_id = this.storageService.getUser().id;
    this.getStatusOfAudit();
  }

  getStatusOfAudit() {
    this.service.getStatusOfAudit(this.auditor_id).subscribe(
      (response) => {
        this.audits = response;
        this.loading = false;
      },
      (error) => (error: HttpErrorResponse) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while fetching Back Logss!',
          detail: '',
        });
      }
    );
  }

  clear(table: Table) {
    table.clear();
  }

  openNew() {
    this.audit = new BranchFinancialAudit();
    this.auditStatusDialog = true;
    this.findingDate = new Date();
    this.statusofAudit = {};
    this.auditor = {};
  }

  changeing(ing: any) {
    this.ing = true;
   }

  OpenEdit(audit: BranchFinancialAudit) {
    this.audit = audit;
    let findingDate: any;
    findingDate = audit.finding_date;
    this.findingDate = new Date(findingDate);

    this.auditStatusDialog = true;
    this.statusofAudit = audit.statusofAudit
      ? audit.statusofAudit
      : new Statusofaudit();

      this.ing = true;

  }

  changeEditAuditee() {
    this.audit.edit_auditee = this.edit_auditee;
  }

  onDataChange(data: any) {
    this.audit.file_urls = data;
  }

  hideDialog() {
    this.auditStatusDialog = false;
    this.statusofauditEditDialog = false;
  }

  saveStatusOfAudit() {
    const user = this.storageService.getUser();
    this.branch.id = user.branch.id;
    this.auditor.branch = this.branch;
    this.auditor.id = user.id;
    this.audit.auditor = this.auditor;
    this.audit.statusofAudit = this.statusofAudit;
    this.audit.edit_auditee = this.edit_auditee;

    let finding_date: any;
    finding_date = this.findingDate;
    this.audit.finding_date = finding_date;

    this.loading=true;
    this.service.saveStatusOfAudit(this.audit).subscribe({
      next: (response) => {
        if (this.audit.id) {
          // this.audits[this.findIndexById(this.audit.id)] = this.audit;
          this.getStatusOfAudit();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Audit Updated',
            life: 3000,
          });
        } else {
          this.getStatusOfAudit();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Audit Created',
            life: 3000,
          });
          this.audits = [...this.audits];
          this.auditStatusDialog = false;
          this.audit = new BranchFinancialAudit();
        }
        this.auditStatusDialog = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while either creating or updating finding!',
          life: 3000,
        });
      },
    });
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.audits.length; i++) {
      if (this.audits[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  deleteStatusOfAudit(audit: BranchFinancialAudit) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' +
        audit.statusofAudit?.branch_audit_id +
        '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service
          .deleteStatusOfAudit(audit.statusofAudit?.branch_audit_id)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter((val) => val.id !== audit.id);
              this.audit = new BranchFinancialAudit();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audit Deleted',
                life: 3000,
              });
              window.location.reload();
            },
            error: (error: HttpErrorResponse) => {
              this.loading = false;

              this.messageService.add({
                severity: 'error',
                summary:
                  error.status == 401
                    ? 'You are not permitted to perform this action!'
                    : 'Something went wrong while deleting Back Logs!',
                detail: '',
              });
            },
          });
      },
    });
  }

  deleteSelectedStatusofdAudits() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Back Logss?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service
          .deleteSelecteStatusofdAudits(this.selectedstatusofAudits)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter(
                (val) => !this.selectedstatusofAudits.includes(val)
              );
              this.selectedstatusofAudits = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audits Deleted',
                life: 3000,
              });
            },
            error: (error: HttpErrorResponse) => {
              this.loading = false;

              this.messageService.add({
                severity: 'error',
                summary:
                  error.status == 401
                    ? 'You are not permitted to perform this action!'
                    : 'Something went wrong while deleting finding!',
                detail: '',
              });
            },
          });
      },
    });
  }

  passSelectedStatusOfdAudits() {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to pass the selected Back Logss to reviewer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service
          .passSelecteStatusOfdAudits(this.selectedstatusofAudits)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter(
                (val) => !this.selectedstatusofAudits.includes(val)
              );
              this.selectedstatusofAudits = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audits passed to reviewer',
                life: 3000,
              });
            },
            error: (error: HttpErrorResponse) => {
              this.loading = false;

              this.messageService.add({
                severity: 'error',
                summary:
                  error.status == 401
                    ? 'You are not permitted to perform this action!'
                    : 'Something went wrong while passing findings to the reviewer!',
                detail: '',
              });
            },
          });
      },
    });
  }

  passStatusOfAudit(audit: BranchFinancialAudit) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to pass ' + audit.case_number + ' to reviewer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service
          .passStatusOfAudit(audit.statusofAudit?.branch_audit_id)
          .subscribe({
            next: (response) => {
              console.log(audit.statusofAudit?.branch_audit_id);
              this.audits = this.audits.filter((val) => val.id !== audit.id);
              this.audit = new BranchFinancialAudit();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audit passed to reviewer',
                life: 3000,
              });
            },
            error: (error: HttpErrorResponse) => {
              this.loading = false;

              this.messageService.add({
                severity: 'error',
                summary:
                  error.status == 401
                    ? 'You are not permitted to perform this action!'
                    : 'Something went wrong while passing finding to the reviewer!',
                detail: '',
              });
            },
          });
      },
    });
  }
}
