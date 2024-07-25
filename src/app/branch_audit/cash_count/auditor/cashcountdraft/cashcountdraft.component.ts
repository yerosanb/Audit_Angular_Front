import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { CashCount } from 'app/branch_audit/model/cash-count';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { CashcountdraftService } from './cashcountdraft.service';


@Component({
  selector: 'app-cashcountdraft',
  templateUrl: './cashcountdraft.component.html',
  styleUrls: ['./cashcountdraft.component.css'],
})
export class CashcountdraftComponent implements OnInit {
  public Editor = ClassicEditor;
  auditor_id!: any;
  loading = true;
  audits: BranchFinancialAudit[];
  audit = new BranchFinancialAudit();
  submitted: boolean = false;
  cashCountEditDialog: boolean = false;
  cashcount = new CashCount();
  auditor = new User();
  edit_auditee: Boolean = false;
  errorMessage: String = '';
  selectedCashCount: BranchFinancialAudit[] = [];
  category: string = '';
  cashtype: any[];
  actual: number;
  trial: number;
  dif: number;
  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];
  fileInfos: Observable<any>;
  environment = environment;
  row_detail_change_tracker: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker_list: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker = new ChangeTrackerBranchAudit();
  audit_edit_history: BranchFinancialAudit[];
  auditor_change_tracker: ChangeTrackerBranchAudit[] = [];
  editHistoryDialog: boolean;
  reviewer_change_tracker: ChangeTrackerBranchAudit[] = [];
  approver_change_tracker: ChangeTrackerBranchAudit[] = [];

  isEditData = false;
  auditorFileInfos: Observable<any>;
  audits_to_be_exported: any[] = [];
  outputAudit: any[] = [];

  constructor(
    private storageService: StorageService,
    private service: CashcountdraftService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fileService: BranchFinancialAuditService
  ) {}

  ngOnInit() {
    this.auditor_id = this.storageService.getUser().id;
    // this.getFindings(this.auditor_id);
    this.getCashCount(this.auditor_id);
    this.category = this.storageService.getUser().category;
    this.cashtype = [
      { type: 'Local Currency' },
      { type: 'Foreign Currency' },
      { type: 'Petty Cash' },
      { type: 'ATM Cash' },
      { type: 'Other' },
    ];
  }


  getCashCount(auditor_id: number) {
    this.service.getCashCount(auditor_id).subscribe(
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
              : 'Something went wrong while fetching cash count!',
          detail: '',
        });
      }
    );
  }

  clear(table: Table) {
    table.clear();
  }

  openNew() {
    this.outputAudit = [];
    this.audit = new BranchFinancialAudit();
    this.isEditData = true;
    this.outputAudit.push(this.audit);
    this.outputAudit.push(this.isEditData);
    this.cashCountEditDialog = true;
  }

  editAudit(audit: BranchFinancialAudit) {
    this.outputAudit = [];
    this.audit = { ...audit };
    this.isEditData = false;
    this.outputAudit.push(this.audit);
    this.outputAudit.push(this.isEditData);
    this.cashCountEditDialog = true;
  }

  onDataChange(data: any) {
    if (this.isEditData) {
      let auditor_id = this.storageService.getUser().id;
      this.getCashCount(auditor_id);
      this.audits = [...this.audits];
      this.cashCountEditDialog = false;
      this.audit = new BranchFinancialAudit();
    } else {
      this.audits[this.findIndexById(data[0].id)] = data[0];
    }
    this.cashCountEditDialog = false;
  }

  hideDialog() {
    this.cashCountEditDialog = false;
    this.submitted = false;
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

  deleteSelectedCashCount() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected cash Count?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteSelectedCashCount(this.selectedCashCount).subscribe({
          next: (response) => {
            this.audits = this.audits.filter(
              (val) => !this.selectedCashCount.includes(val));
            this.selectedCashCount = [];
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Cash counts Deleted',
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
                  : 'Something went wrong while deleting selected cash counts!',
              detail: '',
            });
          },
        });
      },
    });
  }

  passSelectedCashCount() {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to pass the selected cash count findings to reviewer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.passSelectedCashCount(this.selectedCashCount).subscribe({
          next: (response) => {
            this.audits = this.audits.filter(
              (val) => !this.selectedCashCount.includes(val)
            );
            this.selectedCashCount = [];
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Cash counts passed to reviewer',
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
                  : 'Something went wrong while passing cash counts to the reviewer!',
              detail: '',
            });
          },
        });
      },
    });
  }

  deleteCashCount(audit: BranchFinancialAudit) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' +
        audit.cashcount?.branch_audit_id +
        '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service
          .deleteCashCount(audit.cashcount?.branch_audit_id)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter((val) => val.id !== audit.id);
              this.audit = new BranchFinancialAudit();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Cash Count Deleted',
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
                    : 'Something went wrong while deleting cash count!',
                detail: '',
              });
            },
          });
      },
    });
  }

  passCashCount(audit: BranchFinancialAudit) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to pass ' + audit.case_number + ' to reviewer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.passCashCount(audit.cashcount?.branch_audit_id).subscribe({
          next: (response) => {
            this.audits = this.audits.filter((val) => val.id !== audit.id);
            this.audit = new BranchFinancialAudit();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'cash count passed to reviewer',
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
                  : 'Something went wrong while passing cash count to the reviewer!',
              detail: '',
            });
          },
        });
      },
    });
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
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

  getFileUrls(audit: BranchFinancialAudit) {
    if (audit.file_urls) {
      this.fileInfos = this.fileService.getFilesByFileName(audit.file_urls);
    }
  }
}
