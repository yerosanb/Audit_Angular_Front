import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';
import { LoanAndAdvance } from 'app/branch_audit/model/loanAndAdvance/loan-and-advance';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { CommonReviewerBranchFinancialService } from 'app/branch_audit/regional_compiled_audits/service/common-reviewer-branch-financial.service';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { RemarkBranchAuditService } from 'app/branch_audit/services/remark-branch-audit.service';
import { Branches } from 'app/models/admin/branches';
import { Region } from 'app/models/admin/region';
import { User } from 'app/models/admin/user';
import { DateFormat } from 'app/models/shared/date-format';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { LoanAndAdvanceService } from '../Service/loan-and-advance.service';

@Component({
  selector: 'app-loan-and-advance-pending-branch',
  templateUrl: './loan-and-advance-pending-branch.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .audit-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }

      :host ::ng-deep .row_detail .ck-editor {
        width: 95%;
      }
      :host ::ng-deep .table_editor .ck-editor {
        width: 95%;
      }
    `,
  ],
  styleUrls: ['./loan-and-advance-pending-branch.component.css'],
})
export class LoanAndAdvancePendingBranchComponent {
  environment = environment;

  public Editor = ClassicEditor;
  public findingEditor = ClassicEditor;
  public impactEditor = ClassicEditor;
  public recommendationEditor = ClassicEditor;

  dateFormat = new DateFormat();
  auditEditDialog: boolean;
  editHistoryDialog: boolean;
  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];
  events1: any[];
  cols: any[];
  audit = new BranchFinancialAudit();
  loanAndAdvance = new LoanAndAdvance();

  selectedAudits: BranchFinancialAudit[] = [];
  auditees: Branches[] = [];
  edit_auditee: Boolean = false;
  reviewer: User = new User();
  selected_auditees: Branches[] = [];

  updated = false;
  submitted = false;
  errorMessage: String = '';
  loading = true;
  audits: BranchFinancialAudit[];
  audit_edit_history: BranchFinancialAudit[];

  unseenRemarkBranchAudit = new RemarkBranchAudit();
  currentUser = new User();
  unseen_remark = 0;
  category = '';
  fileInfos: Observable<any>;

  auditor_change_tracker: ChangeTrackerBranchAudit[] = [];
  reviewer_change_tracker: ChangeTrackerBranchAudit[] = [];
  approver_change_tracker: ChangeTrackerBranchAudit[] = [];
  row_detail_change_tracker: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker_list: ChangeTrackerBranchAudit[] = [];

  change_tracker_branch_audit: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker = new ChangeTrackerBranchAudit();
  displayModalReject: boolean;

  audit_remark = new BranchFinancialAudit();
  reject_remark = new RemarkBranchAudit();

  auditRemarkDialog = false;
  outputAudit: any[] = [];
  overDraftPassed: any[] = [];
  isEditData = false;
  _selectedColumns: any[];
  user_type = new User();

  region = new Region();
  branch = new Branches();

  constructor(
    private fileService: BranchFinancialAuditService,
    private storageService: StorageService,
    private messageService: MessageService,
    private remarkService: RemarkBranchAuditService,
    private confirmationService: ConfirmationService,
    private loanService: LoanAndAdvanceService,
    private commonService: CommonReviewerBranchFinancialService,
    private commonReviewerBranchFinancialService: CommonReviewerBranchFinancialService
  ) {}

  ngOnInit(): void {
    const userData = this.storageService.getUser();
    this.user_type.banking = userData.banking;
    if (userData.region) {
      this.region.id = userData.region.id;
      this.user_type.region = this.region;
    }
    if (userData.branch) {
      this.branch.id = userData.branch.id;
      this.user_type.branch = this.branch;
    }
    this.getPendingAuditsForReview(this.user_type);
  }

  getPendingAuditsForReview(category: any) {
    this.loanService.getAuditsForReviewer(category).subscribe(
      (response) => {
        this.audits = response;
        this.loading=false;
        //console.log(this.audits);
      },
      (error) => (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while fetching findings!',
          detail: '',
        });
      }
    );
    this.cols = [
      { field: 'case_number', header: 'Case Number' },
      // { field: 'finding', header: 'Finding' },
      // { field: 'impact', header: 'Impact' },
      // { field: 'recommendation', header: 'Recommendation' },
      { field: 'borrower_name', header: 'Borrower Name' },
      { field: 'account_number', header: 'Account Number' },
      { field: 'loan_type', header: 'Loan Type' },
      { field: 'amount_granted', header: 'Amount Granted' },
      { field: 'interest_rate', header: 'Interest/Profit Rate' },
      { field: 'arrears', header: 'Arrears' },
      { field: 'loan_disbursed_date', header: 'Disbursed Date' },
      { field: 'approved_amount', header: 'Approved Amount' },
      { field: 'overdrawn_balance', header: ' Outstanding balance' },
      { field: 'difference', header: 'Difference' },
      { field: 'penalty_charge', header: 'Penality Charge' },
      { field: 'due_date', header: 'Payment Mode' },
      { field: 'expiry_date', header: 'Expiry Date' },
    ];

    this._selectedColumns = this.cols;
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
  }

  reviewAudit(audit: BranchFinancialAudit) {
    this.user_type.id = this.storageService.getUser().id;

    this.reviewer.id = this.storageService.getUser().id;
    audit.id = audit.id;
    audit.reviewer = this.reviewer;

    this.confirmationService.confirm({
      message: 'Are you sure you want to Review audit?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commonService.reviewFindings(audit).subscribe({
          next: (response) => {
            this.audits = this.audits.filter((val) => val.id !== audit.id);
            this.audit = new BranchFinancialAudit();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Audit Reviewed',
              life: 300,
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
                  : 'Something went wrong while reviewing finding!',
              detail: '',
            });
          },
        });
      },
    });
  }

  reviewMultiAuditfinding() {
    this.reviewer.id = this.storageService.getUser().id;
    this.selectedAudits[0].reviewer = this.reviewer;
    this.confirmationService.confirm({
      message: 'Are you sure you want to Review audits ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commonService
          .reviewMultiAuditfinding(this.selectedAudits)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter(
                (val) => !this.selectedAudits.includes(val)
              );
              this.selectedAudits = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audits Reviewed',
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
                    : 'Something went wrong while reviewing finding!',
                detail: '',
              });
            },
          });
      },
    });
  }
  openRemarkModal(audit: BranchFinancialAudit) {
    this.audit_remark = { ...audit };
    this.auditRemarkDialog = true;
  }

  exportPdf() {
    // import('jspdf').then((jsPDF) => {
    //   import('jspdf-autotable').then((x) => {
    //     const doc = new jsPDF.default(0, 0);
    //     doc.autoTable(this.exportColumns, this.audits);
    //     doc.save('products.pdf');
    //   });
    // });
  }
  getFileUrls(audit: BranchFinancialAudit) {
    if (audit.file_urls) {
      this.fileInfos = this.fileService.getFilesByFileName(audit.file_urls);
    }
  }

  getChangeTrackerForRowDetail(audit: BranchFinancialAudit) {
    this.getFileUrls(audit);
    this.getUnseenRemarkBranchAudits(audit);
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

  getReviewerEditHistory(
    id: any,
    openDialog: Boolean
  ): ChangeTrackerBranchAudit[] {
    this.edit_history_table_tracker_list = [];
    let reviewer_id = this.storageService.getUser().id;
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
  getUnseenRemarkBranchAudits(audit: BranchFinancialAudit) {
    this.unseenRemarkBranchAudit.branchFinancialAudit = audit;
    this.currentUser.id = this.storageService.getUser().id;
    this.unseenRemarkBranchAudit.reciever = this.currentUser;
    this.remarkService
      .getUnseenRemarks(this.unseenRemarkBranchAudit)
      .subscribe({
        next: (res) => {
          this.unseen_remark = res.length;
          console.log(this.unseen_remark);
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              error.status == 401
                ? 'You are not permitted to perform this action!'
                : 'Something went wrong ',
            life: 3000,
          });
        },
      });
  }
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.audits);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }
  hideDialog() {
    this.auditEditDialog = false;
    this.editHistoryDialog = false;
    this.submitted = false;
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }

  onDataLoad(data: any) {
    if (data[1]) {
      let auditor_id = this.storageService.getUser().id;

      this.getPendingAuditsForReview(this.category);
      this.audits = [...this.audits];
      this.auditEditDialog = false;
      this.audit = new BranchFinancialAudit();
    } else {
      this.audits[this.findIndexById(data[0].id)] = data[0];
    }
    this.auditEditDialog = false;
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

  cancelISMAudit(remarkBranchAudit: RemarkBranchAudit) {
    this.commonReviewerBranchFinancialService
      .cancelFinding(remarkBranchAudit)
      .subscribe({
        next: (response) => {
          this.displayModalReject = false;
          this.audits = this.audits.filter(
            (val) => val.id !== remarkBranchAudit.branchFinancialAudit?.id
          );
          this.audit = new BranchFinancialAudit();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Audits Rejected',
            life: 3000,
          });
        },
        error: (error: HttpErrorResponse) => {
          this.displayModalReject = false;
          this.loading = false;
          this.errorMessage = error.message;
          this.submitted = true;
          this.messageService.add({
            severity: 'error',
            summary:
              error.status == 401
                ? 'You are not permitted to perform this action!'
                : 'Something went wrong while rejecting finding!',
            detail: '',
          });
        },
      });
  }

  showModalDialogReject(audit: BranchFinancialAudit) {
    this.displayModalReject = true;
    this.user_type.id = this.storageService.getUser().id;
    audit.reviewer = this.user_type;
    this.reject_remark.branchFinancialAudit = audit;
    this.reject_remark.reciever = audit.auditor;
    this.reject_remark.sender = this.user_type;
  }
}
