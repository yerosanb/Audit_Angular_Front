import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';
import { LoanAndAdvance } from 'app/branch_audit/model/loanAndAdvance/loan-and-advance';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { Branches } from 'app/models/admin/branches';
import { User } from 'app/models/admin/user';
import { BranchService } from 'app/services/admin/branch.service';
import { RecommendationService } from 'app/services/approver/recommendation.service';
import { CommonFindingService } from 'app/services/shared/audit/common-finding.service';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { OverDraft } from '../../../model/overdraft/over-draft';
import { LoanAndAdvanceAuditorService } from '../Services/loan-and-advance-auditor.service';

@Component({
  selector: 'app-loan-and-advance-drafted-branch',
  templateUrl: './loan-and-advance-drafted-branch.component.html',
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
  styleUrls: ['./loan-and-advance-drafted-branch.component.css'],
})
export class LoanAndAdvanceDraftedBranchComponent {
  environment = environment;
  public Editor = ClassicEditor;

  auditEditDialog: boolean;
  editHistoryDialog: boolean;

  submitted: boolean;
  selected_auditees: Branches[] = [];

  audits: BranchFinancialAudit[];
  audit = new BranchFinancialAudit();
  selectedAudits: BranchFinancialAudit[] = [];
  audit_edit_history: BranchFinancialAudit[];
  loanAndAdvance = new LoanAndAdvance();
  overDraft = new OverDraft();

  edit_history_table_tracker = new ChangeTrackerBranchAudit();

  changer = new User();

  updated = false;
  errorMessage: String = '';
  loading = true;
  edit_auditee: Boolean = false;
  auditees: Branches[] = [];

  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];
  auditor = new User();
  category = '';
  uploadedFiles: any[] = [];
  fileInfos: Observable<any>;
  uploaded_files: any[];
  account_type_intial: any;

  auditor_change_tracker: ChangeTrackerBranchAudit[] = [];
  reviewer_change_tracker: ChangeTrackerBranchAudit[] = [];
  approver_change_tracker: ChangeTrackerBranchAudit[] = [];
  row_detail_change_tracker: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker_list: ChangeTrackerBranchAudit[] = [];
  outputAudit: any[] = [];
  isEditData = false;

  _selectedColumns: any[];

  cols: any[];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private auditService: LoanAndAdvanceAuditorService,
    private branchService: BranchService,
    private fileService: BranchFinancialAuditService,
    private storageService: StorageService,
    private commonFindingService: CommonFindingService,
    private recommendationService: RecommendationService
  ) {}

  ngOnInit() {
    let auditor_id = this.storageService.getUser().id;
    this.category = this.storageService.getUser().category;
    this.getLoanAndAdvanceOnDraft(auditor_id);

    this.cols = [
      { field: 'case_number', header: 'Case Number' },
      // { field: 'finding', header: 'Finding' },
      // { field: 'impact', header: 'Impact' },
      // { field: 'recommendation', header: 'Recommendation' },
      { field: 'borrower_name', header: 'Borrower Name' },
      { field: 'account_number', header: 'Account Number' },
      { field: 'category', header: 'Loan Category' },

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

  viewDetail(data: any) {}
  changeEditAuditee() {
    this.audit.edit_auditee = this.edit_auditee;
  }
  onDataChange(data: any) {
    this.audit.file_urls = data;
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

  deleteSingleLoanAndAdvance(audit: BranchFinancialAudit) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + audit.case_number + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.auditService.deleteSingleLoanAndAdvance(audit.id).subscribe({
          next: (response) => {
            this.audits = this.audits.filter((val) => val.id !== audit.id);
            this.audit = new BranchFinancialAudit();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Audit Deleted',
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
                  : 'Something went wrong while deleting finding!',
              detail: '',
            });
          },
        });
      },
    });
  }
  passSingleLoanAndAdvance(audit: BranchFinancialAudit) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to pass ' + audit.case_number + ' to reviewer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.auditService.passSingleLoanAndAdvance(audit.id).subscribe({
          next: (response) => {
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
            this.errorMessage = error.message;
            this.submitted = true;
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
  hideDialog() {
    this.auditEditDialog = false;
    this.submitted = false;
  }
  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }
  deleteSelectedLoanAndAdvance() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected audits?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.auditService
          .deleteSelectedLoanAndAdvance(this.selectedAudits)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter(
                (val) => !this.selectedAudits.includes(val)
              );
              this.selectedAudits = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audits Deleted',
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
                    : 'Something went wrong while deleting finding!',
                detail: '',
              });
            },
          });
      },
    });
  }
  passSelectedLoanAndAdvance() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to pass the selected audits to reviewer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.auditService
          .passSelectedLoanAndAdvance(this.selectedAudits)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter(
                (val) => !this.selectedAudits.includes(val)
              );
              this.selectedAudits = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audits passed to reviewer',
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
                    : 'Something went wrong while passing findings to the reviewer!',
                detail: '',
              });
            },
          });
      },
    });
  }

  getLoanAndAdvanceOnDraft(auditor_id: number) {
    this.auditService.getLoanAndAdvanceOnDraft(auditor_id).subscribe(
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

  exportPdf() {
    // import('jspdf').then((jsPDF) => {
    //   import('jspdf-autotable').then((x) => {
    //     const doc = new jsPDF.default(0, 0);
    //     doc.autoTable(this.exportColumns, this.audits);
    //     doc.save('products.pdf');
    //   });
    // });
  }
  exportExcel() {
    1;
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

  openNew() {
    this.outputAudit = [];
    this.audit = new BranchFinancialAudit();
    this.isEditData = true;
    this.outputAudit.push(this.audit);
    this.outputAudit.push(this.isEditData);
    this.auditEditDialog = true;
  }

  editAudit(audit: BranchFinancialAudit) {
    this.outputAudit = [];
    this.audit = { ...audit };
    this.isEditData = false;
    this.outputAudit.push(this.audit);
    this.outputAudit.push(this.isEditData);
    this.auditEditDialog = true;
  }

  onDataLoad(data: any) {
    if (data[1]) {
      let auditor_id = this.storageService.getUser().id;
      this.getLoanAndAdvanceOnDraft(auditor_id);
      this.audits = [...this.audits];
      this.auditEditDialog = false;
      this.audit = new BranchFinancialAudit();
    } else {
      this.audits[this.findIndexById(data[0].id)] = data[0];
    }
    this.auditEditDialog = false;
  }
}
