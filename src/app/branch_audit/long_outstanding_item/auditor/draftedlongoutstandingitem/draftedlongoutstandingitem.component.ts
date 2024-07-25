import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CashcountdraftService } from 'app/branch_audit/cash_count/auditor/cashcountdraft/cashcountdraft.service';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment.prod';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { LongoutstandingitemauditorService } from '../longoutstandingitemauditor.service';

@Component({
  selector: 'app-draftedlongoutstandingitem',
  templateUrl: './draftedlongoutstandingitem.component.html',
  styleUrls: ['./draftedlongoutstandingitem.component.css']
})
export class DraftedlongoutstandingitemComponent implements OnInit {
  environment = environment;
  public Editor = ClassicEditor;
  auditor_id!: any;
  loading=true;
  audits: BranchFinancialAudit[];
  audit = new BranchFinancialAudit();
  selectedLongOutstanding: BranchFinancialAudit[] = [];
  outputAudit: any[] = [];
  isEditData = false;
  longOutstandingEditDialog: boolean = false;
  submitted:boolean;
  errorMessage='';
  row_detail_change_tracker: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker_list: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker = new ChangeTrackerBranchAudit();
  fileInfos: Observable<any>;
  audit_edit_history: BranchFinancialAudit[];
  auditor_change_tracker: ChangeTrackerBranchAudit[] = [];
  editHistoryDialog: boolean;
  reviewer_change_tracker: ChangeTrackerBranchAudit[] = [];
  approver_change_tracker: ChangeTrackerBranchAudit[] = [];
  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];

  constructor(
    private storageService: StorageService,
    private service: LongoutstandingitemauditorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fileService: BranchFinancialAuditService,
    private cashcountservice: CashcountdraftService,
  ) {}

  ngOnInit(): void {
    this.auditor_id = this.storageService.getUser().id;
    this.getPendingLongOutstandingItems(this.auditor_id);
  }

  getPendingLongOutstandingItems(auditor_id: number) {
    this.service.getPendingOutstandingItems(auditor_id).subscribe(
      (response) => {
        this.audits = response;
        this.loading = false;
        //console.log(this.audits);
      },
      (error) => (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while fetching outstanding items!',
          detail: '',
        });
      }
    );
  }

  clear(table: Table) {
    table.clear();
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }

  hideDialog() {
    this.longOutstandingEditDialog = false;
    this.submitted = false;
  }

  openNew() {
    this.outputAudit = [];
    this.audit = new BranchFinancialAudit();
    this.isEditData = true;
    this.outputAudit.push(this.audit);
    this.outputAudit.push(this.isEditData);
    this.longOutstandingEditDialog = true; 
  }

  editAudit(audit: BranchFinancialAudit) {
    this.outputAudit = [];
    this.audit = { ...audit };
    this.isEditData = false;
    this.outputAudit.push(this.audit);
    this.outputAudit.push(this.isEditData);
    this.longOutstandingEditDialog = true;
  }

  onDataChange(data: any) {
    if (this.isEditData) {
      let auditor_id = this.storageService.getUser().id;
      this.getPendingLongOutstandingItems(auditor_id);
      this.audits = [...this.audits];
      this.longOutstandingEditDialog = false;
      this.audit = new BranchFinancialAudit();
    } else {
      this.audits[this.findIndexById(data[0].id)] = data[0];
    }
    this.longOutstandingEditDialog = false;
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

  deleteselectedLongOutstanding() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected cash Count?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cashcountservice.deleteSelectedCashCount(this.selectedLongOutstanding).subscribe({
          next: (response) => {
            this.audits = this.audits.filter(
              (val) => !this.selectedLongOutstanding.includes(val));
            this.selectedLongOutstanding = [];
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Long Outstanding Items Deleted',
              life: 3000,
            });
          },
          error: (error: HttpErrorResponse) => {
            this.loading = false;
            this.errorMessage = error.message;
            this.submitted = true;
            this.messageService.add({
              severity: 'error',
              summary:
                error.status == 401
                  ? 'You are not permitted to perform this action!'
                  : 'Something went wrong while deleting selected long outstanding items!',
              detail: '',
            });
          },
        });
      },
    });
  }

  passselectedLongOutstanding() {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to pass the selected Back Logss to reviewer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cashcountservice.passSelectedCashCount(this.selectedLongOutstanding).subscribe({
          next: (response) => {
            this.audits = this.audits.filter((val) => !this.selectedLongOutstanding.includes(val));
            this.selectedLongOutstanding = [];
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'long outstanding items passed to reviewer',
              life: 3000,
            });
          },
          error: (error: HttpErrorResponse) => {
            this.loading = false;
            this.errorMessage = error.message;
            this.submitted = true;
            this.messageService.add({
              severity: 'error',
              summary:
                error.status == 401
                  ? 'You are not permitted to perform this action!'
                  : 'Something went wrong while passing long outstanding items to the reviewer!',
              detail: '',
            });
          },
        });
      },
    });
  }

  deleteLongOutstanding(audit: BranchFinancialAudit) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' +
        audit.long_outstanding?.branch_audit_id +
        '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cashcountservice
          .deleteCashCount(audit.long_outstanding?.branch_audit_id)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter((val) => val.id !== audit.id);
              this.audit = new BranchFinancialAudit();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Long Outstanding Items Deleted',
                life: 3000,
              });
              window.location.reload();
            },
            error: (error: HttpErrorResponse) => {
              this.loading = false;
              this.errorMessage = error.message;
              this.submitted = true;
              this.messageService.add({
                severity: 'error',
                summary:
                  error.status == 401
                    ? 'You are not permitted to perform this action!'
                    : 'Something went wrong while deleting long outstanding items!',
                detail: '',
              });
            },
          });
      },
    });
  }


  passLongOutstanding(audit: BranchFinancialAudit) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to pass ' + audit.case_number + ' to reviewer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cashcountservice.passCashCount(audit.long_outstanding?.branch_audit_id).subscribe({
          next: (response) => {
            this.audits = this.audits.filter((val) => val.id !== audit.id);
            this.audit = new BranchFinancialAudit();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'long outstanding items passed to reviewer',
              life: 3000,
            });
          },
          error: (error: HttpErrorResponse) => {
            this.loading = false;
            this.errorMessage = error.message;
            this.submitted = true;
            this.messageService.add({
              severity: 'error',
              summary:
                error.status == 401
                  ? 'You are not permitted to perform this action!'
                  : 'Something went wrong while passing long outstanding items to the reviewer!',
              detail: '',
            });
          },
        });
      },
    });
  }

  getChangeTrackerForRowDetail(audit: BranchFinancialAudit) {
    this.getFileUrls(audit);
    this.row_detail_change_tracker = [];
    if (this.getAuditorEditHistory(audit?.id, false).length) {
      this.edit_history_table_tracker = this.getAuditorEditHistory(
        audit?.id,
        false
      )[0];
      this.edit_history_table_tracker.role = 'AUDITOR';
      this.row_detail_change_tracker.push(this.edit_history_table_tracker);
      this.edit_history_table_tracker = {};
    }
    if (this.getApproverEditHistory(audit?.id, false).length) {
      this.edit_history_table_tracker = this.getApproverEditHistory(
        audit?.id,
        false
      )[0];
      this.edit_history_table_tracker.role = 'APPROVER';
      this.row_detail_change_tracker.push(this.edit_history_table_tracker);
      this.edit_history_table_tracker = {};
    }
    if (this.getReviewerEditHistory(audit?.id, false)) {
      this.edit_history_table_tracker = this.getReviewerEditHistory(
        audit?.id,
        false
      )[0];
      this.edit_history_table_tracker.role = 'REVIEWER';
      this.row_detail_change_tracker.push(this.edit_history_table_tracker);
      this.edit_history_table_tracker = {};
    }
    console.log(this.row_detail_change_tracker);
  }

  getFileUrls(audit: BranchFinancialAudit) {
    if (audit.file_urls) {
      this.fileInfos = this.fileService.getFilesByFileName(audit.file_urls);
    }
  }

  getAuditorEditHistory(
    id: any,
    openDialog: Boolean
  ): ChangeTrackerBranchAudit[] {
    let auditor_id = this.storageService.getUser().id;
    this.edit_history_table_tracker_list = [];
    this.audit_edit_history = this.audits.filter((audit) => audit.id == id);
    this.auditor_change_tracker =
      this.audit_edit_history[0].change_tracker_branch_audit.filter(
        (change) => change.changer?.id == auditor_id
      );
    this.edit_history_table_tracker_list = this.auditor_change_tracker;
    if (openDialog) {
      this.editHistoryDialog = true;
    }
    return this.auditor_change_tracker;
  }

  getReviewerEditHistory(
    id: any,
    openDialog: Boolean
  ): ChangeTrackerBranchAudit[] {
    this.edit_history_table_tracker_list = [];
    this.audit_edit_history = this.audits.filter((audit) => audit.id == id);
    this.reviewer_change_tracker =
      this.audit_edit_history[0].change_tracker_branch_audit.filter(
        (change) =>
          change.changer?.id == this.audit_edit_history[0].reviewer?.id
      );
    this.edit_history_table_tracker_list = this.reviewer_change_tracker;
    if (openDialog) {
      this.editHistoryDialog = true;
    }
    return this.reviewer_change_tracker;
  }

  getApproverEditHistory(
    id: any,
    openDialog: Boolean
  ): ChangeTrackerBranchAudit[] {
    this.edit_history_table_tracker_list = [];
    this.audit_edit_history = this.audits.filter((audit) => audit.id == id);
    this.approver_change_tracker =
      this.audit_edit_history[0].change_tracker_branch_audit.filter(
        (change) =>
          change.changer?.id == this.audit_edit_history[0].approver?.id
      );
    this.edit_history_table_tracker_list = this.approver_change_tracker;
    if (openDialog) {
      this.editHistoryDialog = true;
    }
    return this.approver_change_tracker;
  }




}
