import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BranchManagerResponseService } from 'app/branch_audit/common/service/branch-manager-response.service';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
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
import { AssetLiabilityAuditorBranchService } from '../service/asset-liability-auditor-branch.service';

@Component({
  selector: 'app-asset-liability-passed-branch',
  templateUrl: './asset-liability-passed-branch.component.html',
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
  styleUrls: ['./asset-liability-passed-branch.component.css'],
})
export class AssetLiabilityPassedBranchComponent {
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

  change_tracker_ISM: ChangeTrackerBranchAudit[] = [];

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
  outputBranchFinancialAudit: BranchFinancialAudit[] = [];
  auditeeResponseDialog = false;

  audits_rectification: BranchFinancialAudit[] = [];
  audit_rectification = new BranchFinancialAudit();

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private storageService: StorageService,
    private remarkService: RemarkBranchAuditService,
    private userService: UserService,
    private assetLiabilityAuditorService: AssetLiabilityAuditorBranchService,
    private auditeeResponseService: BranchManagerResponseService,
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
      { field: 'asset_amount', header: 'Asset Amount' },
      { field: 'liability_amount', header: 'Liability Amount' },
      { field: 'difference', header: 'Difference' },
      { field: 'finding_date', header: 'Date of Discrepancy' },
      { field: 'review_status', header: 'Review Status' },
      { field: 'approve_status', header: 'Approve Status' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));

    this.editorConfig = {
      base_url: '/tinymce',
      suffix: '.min',
      height: 300,
      plugins: [
        'advlist',
        'autolink',
        'lists',
        'link',
        'image',
        'charmap',
        'preview',
        'anchor',
        'searchreplace',
        'visualblocks',
        'fullscreen',
        'insertdatetime',
        'media',
        'table',
        'help',
        'wordcount',
      ],
      toolbar:
        'undo redo | casechange blocks | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist  outdent indent | removeformat |  code table help|cell merge',
    };
  }

  getFindings(auditor_id: number) {
    this.assetLiabilityAuditorService
      .getPassedAssetLiablity(auditor_id)
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

  editAudit(audit: BranchFinancialAudit) {
    this.audit = { ...audit };

    this.auditEditDialog = true;

  }

  clear(table: Table) {
    table.clear();
  }

  backAudit(audit: BranchFinancialAudit) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to back ' + audit.case_number + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.assetLiabilityAuditorService
          .backPassedAssetLiablity(audit)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter((val) => val.id !== audit.id);
              this.audit = new BranchFinancialAudit();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audit return to drafting status',
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

  backSelectedAudits() {
    this.selectedAudits = this.selectedAudits.filter(
      (audit) => audit.review_status === 0);
    if (this.selectedAudits.length > 0) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to back the selected audits?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.assetLiabilityAuditorService
          .backSelectedPassedAssetLiablity(this.selectedAudits)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter(
                (val) => !this.selectedAudits.includes(val)
              );
              this.selectedAudits = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audits Backe to Drafted State',
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
  } else {
    this.messageService.add({
      severity: 'error',
      summary:
        "Please choose audits that haven't had any reviewer actions taken.",
      detail: '',
      life: 6000,
    });
  }
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
    let auditor_id = this.storageService.getUser().id;

    this.edit_history_table_tracker_list = [];
    this.audit_edit_history = this.audits.filter((audit) => audit.id == id);
    if (this.audit_edit_history[0].change_tracker_branch_audit)
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
    if (this.audit_edit_history[0].change_tracker_branch_audit)
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
    this.unseenRemark.branchFinancialAudit = audit;
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

  addAuditeeResponse(audit: BranchFinancialAudit) {
    this.audit = audit;
    this.outputBranchFinancialAudit = [];
    this.outputBranchFinancialAudit.push(this.audit);
    this.auditeeResponseDialog = true;
  }

  onDataChange(data: BranchFinancialAudit[]) {
    if (data) {
      for (const dt of data) {
        if (dt.id) this.audits[this.findIndexById(dt.id)] = dt;
      }
    }
    this.auditeeResponseDialog = false;
  }

  addAuditeeResponseForSelectedAudits() {
    this.auditeeResponseDialog = true;
    this.outputBranchFinancialAudit = [];

    this.outputBranchFinancialAudit = this.selectedAudits;
    this.auditeeResponseDialog = true;
  }

  rectifyAudit(audit: BranchFinancialAudit) {
    this.audit_rectification = audit;
    this.audits_rectification.push(this.audit_rectification);
    this.confirmationService.confirm({
      message: 'Are you sure you want to rectify ' + audit.case_number + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.auditeeResponseService
          .rectify_auditee_response(this.audits_rectification)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter((val) => val.id !== audit.id);
              this.audit = new BranchFinancialAudit();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audit rectified',
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
                    : 'Something went wrong while rectifiying finding!',
                detail: '',
              });
            },
          });
      },
    });
  }

  rectifySelectedAudit() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to rectify selected audits?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.auditeeResponseService
          .rectify_auditee_response(this.selectedAudits)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter(
                (val) => !this.selectedAudits.includes(val)
              );
              this.selectedAudits = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audits rectified',
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
                    : 'Something went wrong while rectifiying findings!',
                detail: '',
              });
            },
          });
      },
    });
  }
}
