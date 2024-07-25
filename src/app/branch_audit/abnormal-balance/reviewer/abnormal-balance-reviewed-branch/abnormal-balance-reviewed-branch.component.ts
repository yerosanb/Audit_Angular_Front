import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { CommonReviewerBranchFinancialService } from 'app/branch_audit/regional_compiled_audits/service/common-reviewer-branch-financial.service';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { RemarkBranchAuditService } from 'app/branch_audit/services/remark-branch-audit.service';
import { Branches } from 'app/models/admin/branches';
import { User } from 'app/models/admin/user';
import { BranchService } from 'app/services/admin/branch.service';
import { UserService } from 'app/services/admin/user.service';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { AbnormalBalanceReviewerBranchService } from '../service/abnormal-balance-reviewer-branch.service';
@Component({
  selector: 'app-abnormal-balance-reviewed-branch',
  templateUrl: './abnormal-balance-reviewed-branch.component.html',
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
  styleUrls: ['./abnormal-balance-reviewed-branch.component.css'],
})
export class AbnormalBalanceReviewedBranchComponent {
  environment = environment;
  public Editor = ClassicEditor;

  auditEditDialog: boolean;
  editHistoryDialog: boolean;

  submitted: boolean;

  audits: BranchFinancialAudit[];
  audit = new BranchFinancialAudit();
  selectedAudits: BranchFinancialAudit[] = [];
  audit_edit_history: BranchFinancialAudit[];

  updated = false;
  errorMessage: String = '';
  loading = true;
  edit_auditee: Boolean = false;
  auditees: Branches[] = [];

  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];

  events1: any[];

  cols: any[];

  exportColumns: any[];

  auditor = new User();

  editorConfig: any = {};

  uploadedFiles: any[] = [];
  fileInfos: Observable<any>;
  uploaded_files: any[];

  selected_auditees: Branches[] = [];


  edit_history_table_tracker = new ChangeTrackerBranchAudit();

  auditor_change_tracker: ChangeTrackerBranchAudit[] = [];
  reviewer_change_tracker: ChangeTrackerBranchAudit[] = [];
  approver_change_tracker: ChangeTrackerBranchAudit[] = [];
  row_detail_change_tracker: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker_list: ChangeTrackerBranchAudit[] = [];

  changer = new User();

  audit_remark = new BranchFinancialAudit();
  auditRemarkDialog = false;

  unseenRemark = new RemarkBranchAudit();
  currentUser = new User();
  unseen_remark = 0;
  outputData: any[] = [];
  compile_ui = false;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private branchService: BranchService,
    private storageService: StorageService,
    private remarkService: RemarkBranchAuditService,
    private userService: UserService,
    private abnormalBalanceReviewerBranchService: AbnormalBalanceReviewerBranchService,
    private commonReviewerBranchService: CommonReviewerBranchFinancialService,
    private fileService: BranchFinancialAuditService,

  ) {}

  ngOnInit() {
    let auditor_id = this.storageService.getUser().id;
    this.getFindings(auditor_id);

    this.cols = [
      { field: 'case_number', header: 'Case Number' },
      { field: 'finding', header: 'Finding' },
      { field: 'impact', header: 'Impact' },
      { field: 'recommendation', header: 'Recommendation' },
      { field: 'debit', header: 'Debit' },
      { field: 'account_affected', header: 'Account Affected' },
      { field: 'credit', header: 'Credit' },
      { field: 'difference', header: 'Difference' },
      { field: 'finding_date', header: 'Date of Discrepancy' },
      { field: 'review_status', header: 'Review Status' },
      { field: 'approve_status', header: 'Approve Status' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));


  }

  getFindings(auditor_id: number) {
    this.abnormalBalanceReviewerBranchService
      .getReviewedAbnormalBalance(auditor_id)
      .subscribe(
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

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }



  clear(table: Table) {
    table.clear();
  }

  unReviewAbnormalBalance(audit: BranchFinancialAudit) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to unReview ' + audit.case_number + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commonReviewerBranchService
          .unReviewAuditFindings(audit)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter((val) => val.id !== audit.id);
              this.audit = new BranchFinancialAudit();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audit UnReviewed',
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
                    : 'Something went wrong while returning finding to the drafting status!',
                detail: '',
              });
            },
          });
      },
    });
  }


  getFileUrls(audit: BranchFinancialAudit) {
    if(audit.file_urls)
    {
      this.fileInfos = this.fileService.getFilesByFileName(
        audit.file_urls
      );
    }
  }


  unReviewSelectedAbnormalBalance() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to unReview the selected audits?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commonReviewerBranchService
          .unReviewMultiAuditfinding(this.selectedAudits)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter(
                (val) => !this.selectedAudits.includes(val)
              );
              this.selectedAudits = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Selected Audits UnReviewed',
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

  hideDialog() {
    this.auditEditDialog = false;
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

  changeEditAuditee() {
    this.audit.edit_auditee = this.edit_auditee;
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



  getChangeTrackerForRowDetail(audit: BranchFinancialAudit) {
    this.getUnseenRemarks(audit);
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
    if (this.audit_edit_history[0].change_tracker_branch_audit)
      this.auditor_change_tracker =
        this.audit_edit_history[0].change_tracker_branch_audit.filter(
          (change) =>
            change.changer?.id == this.audit_edit_history[0].auditor?.id
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
    let reviewer_id = this.storageService.getUser().id;

    this.audit_edit_history = this.audits.filter((audit) => audit.id == id);
    if (this.audit_edit_history[0].change_tracker_branch_audit)
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

    if (this.audit_edit_history[0].change_tracker_branch_audit)
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

  openRemarkModal(audit: BranchFinancialAudit) {
    this.audit_remark = { ...audit };
    this.auditRemarkDialog = true;
  }

  getUnseenRemarks(audit: BranchFinancialAudit) {
    // this.unseenRemark.InspectionAudit = audit;
    this.currentUser.id = this.storageService.getUser().id;
    this.unseenRemark.reciever = this.currentUser;
    this.remarkService.getUnseenRemarks(this.unseenRemark).subscribe({
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
  onDataChange(data: any) {
    this.audit.file_urls = data;
  }

  compileAudits() {
    this.outputData.push(this.selectedAudits);
    this.outputData.push('AbnormalBalance');
    this.compile_ui = true;
  }
  onDataInput(data: BranchFinancialAudit[]) {
    if (data) {
      this.compile_ui = false;
      this.audits = this.audits.filter((val) => !data.includes(val));
    }
  }
}
