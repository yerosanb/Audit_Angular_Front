import { CommonReviewerBranchFinancialService } from './../../../regional_compiled_audits/service/common-reviewer-branch-financial.service';
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { CashcountreviewedService } from './cashcountreviewed.service';
import { StorageService } from 'app/services/shared/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'app/models/admin/user';
import { environment } from 'environments/environment.prod';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Observable } from 'rxjs';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';

@Component({
  selector: 'app-cashcountreviewed',
  templateUrl: './cashcountreviewed.component.html',
  styleUrls: ['./cashcountreviewed.component.css'],
})
export class CashcountreviewedComponent implements OnInit {
  environment = environment;
  public Editor = ClassicEditor;
  audits: BranchFinancialAudit[] = [];
  errorMessage: String = '';
  loading = true;
  userId: any;
  reviewer: User = new User();
  selectedCashCount: BranchFinancialAudit[] = [];
  submitted = false;
  audit_review: BranchFinancialAudit = new BranchFinancialAudit();
  audit = new BranchFinancialAudit();
  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];
  fileInfos: Observable<any>;
  row_detail_change_tracker: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker = new ChangeTrackerBranchAudit();
  edit_history_table_tracker_list: ChangeTrackerBranchAudit[] = [];
  audit_edit_history: BranchFinancialAudit[];
  auditor_change_tracker: ChangeTrackerBranchAudit[] = [];
  editHistoryDialog: Boolean = false;
  reviewer_change_tracker: ChangeTrackerBranchAudit[] = [];
  approver_change_tracker: ChangeTrackerBranchAudit[] = [];
  compile_ui = false;
  audits_to_be_compiled: any[] = [];
  outputData: any[] = [];

  constructor(
    private service: CashcountreviewedService,
    private storageService: StorageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fileService: BranchFinancialAuditService,
    private commonReviewerBranchFinancialService: CommonReviewerBranchFinancialService
  ) {}

  ngOnInit(): void {
    let user = this.storageService.getUser();
    this.userId = user.id;
    this.getReviewedCashCount();
  }

  getReviewedCashCount() {
    this.service.getReviewedCashCount(this.userId).subscribe(
      (response) => {
        this.audits = response;
        this.loading = false;
      },

      (error) => (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
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

  unreviewSelectedCashCount() {
    this.reviewer.id = this.storageService.getUser().id;
    this.selectedCashCount[0].reviewer = this.reviewer;
    this.confirmationService.confirm({
      message: 'Are you sure you want to Unreview audits ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commonReviewerBranchFinancialService
          .unReviewMultiAuditfinding(this.selectedCashCount)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter(
                (val) => !this.selectedCashCount.includes(val)
              );
              this.selectedCashCount = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Cash Counts Reviewed',
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
                    : 'Something went wrong while unreviewing cash counts!',
                detail: '',
              });
            },
          });
      },
    });
  }

  compileCashCounts() {
    let selected_audits_account_type: String[] | any;

    if (this.selectedCashCount) {
      selected_audits_account_type = this.selectedCashCount
        .filter(
          (branchFinancialAudit: BranchFinancialAudit) =>
            branchFinancialAudit?.cashcount?.cash_count_type
        )
        .map(
          (branchFinancialAudit: BranchFinancialAudit) =>
            branchFinancialAudit?.cashcount?.cash_count_type
        );
    }
    if (selected_audits_account_type) {
      this.audits_to_be_compiled = selected_audits_account_type;
      if (this.areAllEqual(this.audits_to_be_compiled)) {
        this.outputData.push(this.selectedCashCount);
        this.outputData.push('CashCount');
        this.compile_ui = true;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Please select audits with the same cash count type',
          detail: '',
        });
      }
    }
  }

  areAllEqual(array: any[]): boolean {
    return array.every((item) => item === array[0]);
  }

  onDataInput(data: BranchFinancialAudit[]) {
    if (data) {
      this.compile_ui = false;
      this.audits = this.audits.filter((val) => !data.includes(val));
    }
  }

  unreviewCashCount(cash: BranchFinancialAudit) {
    this.reviewer.id = this.storageService.getUser().id;
    this.audit_review.id = cash.id;
    this.audit_review.reviewer = this.reviewer;
    this.confirmationService.confirm({
      message: 'Are you sure you want to Unreview audit ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commonReviewerBranchFinancialService
          .unReviewAuditFindings(this.audit_review)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter((val) => val.id !== cash.id);
              this.audit = new BranchFinancialAudit();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Cash Count Reviewed',
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
                    : 'Something went wrong while reviewing cash count!',
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

  getFileUrls(audit: BranchFinancialAudit) {
    if (audit.file_urls) {
      this.fileInfos = this.fileService.getFilesByFileName(audit.file_urls);
    }
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
    this.edit_history_table_tracker_list = [];
    this.audit_edit_history = this.audits.filter((audit) => audit.id == id);
    this.auditor_change_tracker =
      this.audit_edit_history[0].change_tracker_branch_audit.filter(
        (change) => change.changer?.id == this.audit_edit_history[0].auditor?.id
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
    let reviewer_id = this.storageService.getUser().id;
    this.edit_history_table_tracker_list = [];
    this.audit_edit_history = this.audits.filter((audit) => audit.id == id);
    this.reviewer_change_tracker =
      this.audit_edit_history[0].change_tracker_branch_audit.filter(
        (change) => change.changer?.id == reviewer_id
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

  hideDialog() {
    this.editHistoryDialog = false;
    this.compile_ui = false;
    this.submitted = false;
  }
}
