import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RectificationTrackerService } from 'app/branch_audit/common/service/rectification-tracker.service';
import { CashManagementBranch } from 'app/branch_audit/model/Cash_Management_Branch/cash-management-branch';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';
import { CommonReviewerBranchFinancialService } from 'app/branch_audit/regional_compiled_audits/service/common-reviewer-branch-financial.service';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { Branches } from 'app/models/admin/branches';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CashManagementBranchService } from '../service/cash-management-branch.service';
@Component({
  selector: 'app-reviewered-cash-management',
  templateUrl: './reviewered-cash-management.component.html',
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

  styleUrls: ['./reviewered-cash-management.component.css'],
})
export class RevieweredCashManagementComponent {
  environment = environment;

  public Editor = ClassicEditor;

  audit = new BranchFinancialAudit();
  audit_review: BranchFinancialAudit = new BranchFinancialAudit();
  audit_edit_history: BranchFinancialAudit[];

  updated = false;
  submitted = false;
  errorMessage: String = '';
  loading = true;

  audits: BranchFinancialAudit[] = [];
  selectedAudits: BranchFinancialAudit[] = [];
  auditee_placeholder: Branches = new Branches();
  auditees: Branches[] = [];
  edit_auditee: Boolean = false;
  reviewer: User = new User();
  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];
  risk_levels: any[];
  cols: any[];
  cashManagementBranch = new CashManagementBranch();

  edit_history_table_tracker = new ChangeTrackerBranchAudit();

  cash_type_intial: any;

  auditor_change_tracker: ChangeTrackerBranchAudit[] = [];
  reviewer_change_tracker: ChangeTrackerBranchAudit[] = [];
  approver_change_tracker: ChangeTrackerBranchAudit[] = [];
  row_detail_change_tracker: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker_list: ChangeTrackerBranchAudit[] = [];

  editHistoryDialog: Boolean = false;

  editorConfig: any = {};

  uploadedFiles: any[] = [];
  fileInfos: Observable<any>;
  uploaded_files: any[];

  outputData: any[] = [];
  compile_ui = false;
  audits_to_be_compiled: any[] = [];

  category = '';
  constructor(
    private storageService: StorageService,
    private fileService: BranchFinancialAuditService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cashManagementBranchService: CashManagementBranchService,
    private commonService: CommonReviewerBranchFinancialService,
    private rectificationTrackerService: RectificationTrackerService
  ) {}

  ngOnInit(): void {
    let user = this.storageService.getUser();
    this.category = this.storageService.getUser().category;

    this.cashManagementBranchService
      .getReviewedFindingforcash(user.id)
      .subscribe(
        (response) => {
          this.audits = response;
          this.loading=false;
        },

        (error) => (error: HttpErrorResponse) => {
          this.errorMessage = error.error.message;
          this.loading=false;
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

    this.risk_levels = [
      { label: 'Very High', value: 'Very High' },
      { label: 'High', value: 'High' },
      { label: 'Medium', value: 'Medium' },
      { label: 'Low', value: 'Low' },
      { label: 'Very Low', value: 'Very Low' },
    ];
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }

  // getFileUrls(audit: BranchFinancialAudit) {
  //   if (audit?.is_MGTAuditee) {
  //     if (audit?.is_MGTAuditee[0].auditeeDivisionISM)
  //       this.uploaded_files =
  //         audit?.is_MGTAuditee[0]?.auditeeDivisionISM[0]?.uploaded_files?.map(
  //           (AuditeeDivisionFileIsm) => AuditeeDivisionFileIsm.file_url
  //         ) as any;
  //   }
  //   this.fileInfos = this.auditeeISMService.getFilesByFileName(
  //     this.uploaded_files
  //   );
  // }

  unreviewAudit(selected_audit: BranchFinancialAudit) {
    this.reviewer.id = this.storageService.getUser().id;
    this.audit_review.id = selected_audit.id;
    this.audit_review.reviewer = this.reviewer;

    this.confirmationService.confirm({
      message: 'Are you sure you want to Unreview audit ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commonService.unReviewAuditFindings(this.audit_review).subscribe({
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
                  : 'Something went wrong while reviewing finding!',
              detail: '',
            });
          },
        });
      },
    });
  }

  unreviewSelectedFinding() {
    this.reviewer.id = this.storageService.getUser().id;
    this.selectedAudits[0].reviewer = this.reviewer;
    this.confirmationService.confirm({
      message: 'Are you sure you want to Unreview audits ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commonService
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
                    : 'Something went wrong while unreviewing finding!',
                detail: '',
              });
            },
          });
      },
    });
  }

  makeSelectedFindingsSeen() {
    this.reviewer.id = this.storageService.getUser().id;
    this.selectedAudits[0].reviewer = this.reviewer;
    this.confirmationService.confirm({
      message: 'Are you sure you want to make selected audits seen ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.rectificationTrackerService
          .seenAudits(this.selectedAudits)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter(
                (val) => !this.selectedAudits.includes(val)
              );
              this.selectedAudits = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audits Made Seen',
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
                    : 'Something went wrong while making findings to seen!',
                detail: '',
              });
            },
          });
      },
    });
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

  onDataChange(data: any) {
    this.audit.file_urls = data;
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
    this.submitted = false;
  }

  compileAudits() {
    let selected_audits_cash_type: String[] | any;
    if (this.selectedAudits) {
      selected_audits_cash_type = this.selectedAudits
        .filter(
          (branchFinancialAudit: BranchFinancialAudit) =>
            branchFinancialAudit?.cashManagementBranch?.cash_type
        )
        .map(
          (branchFinancialAudit: BranchFinancialAudit) =>
            branchFinancialAudit?.cashManagementBranch?.cash_type
        );
    }
    if (selected_audits_cash_type) {
      this.audits_to_be_compiled = selected_audits_cash_type;
      if (this.areAllEqual(this.audits_to_be_compiled)) {
        this.outputData.push(this.selectedAudits);
        this.outputData.push('CashManagement');
        this.compile_ui = true;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Please select audits with the same Currency Type',
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
      this.compile_ui = false
      this.audits = this.audits.filter((val) => !data.includes(val));
    }
  }
}
