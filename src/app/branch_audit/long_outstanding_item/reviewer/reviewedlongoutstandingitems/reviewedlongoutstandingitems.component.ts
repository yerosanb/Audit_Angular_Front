import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';
import { CommonReviewerBranchFinancialService } from 'app/branch_audit/regional_compiled_audits/service/common-reviewer-branch-financial.service';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment.prod';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { LongoutstandingitemreviewerService } from '../longoutstandingitemreviewer.service';

@Component({
  selector: 'app-reviewedlongoutstandingitems',
  templateUrl: './reviewedlongoutstandingitems.component.html',
  styleUrls: ['./reviewedlongoutstandingitems.component.css'],
})
export class ReviewedlongoutstandingitemsComponent implements OnInit {
  environment = environment;
  public Editor = ClassicEditor;
  loading: boolean = true;
  audits: BranchFinancialAudit[];
  audit = new BranchFinancialAudit();
  selectedLongOutstanding: BranchFinancialAudit[] = [];
  userId: any;
  errorMessage = '';
  submitted: boolean = false;
  reviewer: User = new User();
  audit_review: BranchFinancialAudit = new BranchFinancialAudit();
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
  outputData: any[] = [];
  audits_to_be_compiled: any[] = [];
  compile_ui = false;

  constructor(
    private service: LongoutstandingitemreviewerService,
    private storageService: StorageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fileService: BranchFinancialAuditService,
    private cashcountservice: CommonReviewerBranchFinancialService
  ) {}
  ngOnInit(): void {
    let user = this.storageService.getUser();
    this.userId = user.id;
    this.getReviewedLongOutstandingItems();
  }

  getReviewedLongOutstandingItems() {
    this.service.getReviewedLongOutstandingItems(this.userId).subscribe(
      (response) => {
        this.audits = response;
        this.loading = false;
        console.log(this.audit);
      },

      (error) => (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
        this.messageService.add({
          severity: 'error',
          summary:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while fetching long outstanding items!',
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

  unreviewSelectedCashCount() {
    this.reviewer.id = this.storageService.getUser().id;
    this.selectedLongOutstanding[0].reviewer = this.reviewer;
    this.confirmationService.confirm({
      message: 'Are you sure you want to Unreview audits ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cashcountservice
          .unReviewMultiAuditfinding(this.selectedLongOutstanding)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter(
                (val) => !this.selectedLongOutstanding.includes(val)
              );
              this.selectedLongOutstanding = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Long Outstanding Items Reviewed',
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
                    : 'Something went wrong while unreviewing long outstanding items!',
                detail: '',
              });
            },
          });
      },
    });
  }

  unreviewLongOutstandingItems(selected_audit: BranchFinancialAudit) {
    this.reviewer.id = this.storageService.getUser().id;
    this.audit_review.id = selected_audit.id;
    this.audit_review.reviewer = this.reviewer;

    this.reviewer.id = this.storageService.getUser().id;
    this.audit_review.id = selected_audit.id;
    this.audit_review.reviewer = this.reviewer;
    this.confirmationService.confirm({
      message: 'Are you sure you want to Unreview audit ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cashcountservice
          .unReviewAuditFindings(this.audit_review)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter(
                (val) => val.id !== selected_audit.id
              );
              this.audit = new BranchFinancialAudit();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audit Reviewed',
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
                    : 'Something went wrong while unreviewing finding!',
                detail: '',
              });
            },
          });
      },
    });
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

  compileLongOutstandingItems() {
    let selected_audits_account_type: String[] | any;

    let selected_items_age: String[] | any;

    if (this.selectedLongOutstanding) {
      selected_audits_account_type = this.selectedLongOutstanding
        .filter(
          (branchFinancialAudit: BranchFinancialAudit) =>
            branchFinancialAudit?.long_outstanding?.outstanding_item
        )
        .map(
          (branchFinancialAudit: BranchFinancialAudit) =>
            branchFinancialAudit?.long_outstanding?.outstanding_item
        );

      selected_items_age = this.selectedLongOutstanding
        .filter(
          (branchFinancialAudit: BranchFinancialAudit) =>
            branchFinancialAudit?.long_outstanding?.selected_item_age
        )
        .map(
          (branchFinancialAudit: BranchFinancialAudit) =>
            branchFinancialAudit?.long_outstanding?.selected_item_age
        );
    }
    if (selected_audits_account_type && selected_items_age) {
      this.audits_to_be_compiled = selected_audits_account_type;
      if (
        this.areAllEqual(this.audits_to_be_compiled) &&
        this.areAllEqual(selected_items_age)
      ) {
        this.outputData.push(this.selectedLongOutstanding);
        this.outputData.push('LongOutstandingItems');
        this.compile_ui = true;
      } else {
        this.messageService.add({
          severity: 'error',
          summary:
            'Please choose audits that have identical outstanding items of the same age.',
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

  hideDialog() {
    this.editHistoryDialog = false;
    this.compile_ui = false;
    this.submitted = false;
  }
}
