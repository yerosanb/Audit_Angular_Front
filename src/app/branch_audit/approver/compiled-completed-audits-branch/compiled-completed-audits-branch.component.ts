import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { RemarkBranchAuditService } from 'app/branch_audit/services/remark-branch-audit.service';
import { Branches } from 'app/models/admin/branches';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { ApproverBranchService } from '../service/approver-branch.service';

@Component({
  selector: 'app-compiled-completed-audits-branch',
  templateUrl: './compiled-completed-audits-branch.component.html',
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
  styleUrls: ['./compiled-completed-audits-branch.component.scss']
})
export class CompiledCompletedAuditsBranchComponent {
  environment = environment;

  public Editor = ClassicEditor;
  editHistoryDialog: boolean;
  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];
  events1: any[];
  risk_levels: any[];
  cols: any[];
  audit = new BranchFinancialAudit();
  audit_review: BranchFinancialAudit = new BranchFinancialAudit();

  updated = false;
  submitted = false;
  errorMessage: String = '';
  loading = true;
  audits: BranchFinancialAudit[];
  audit_edit_history: BranchFinancialAudit[];

  selectedAudits: BranchFinancialAudit[] = [];
  selected_auditees: Branches[] = [];

  change_tracker_ISM: ChangeTrackerBranchAudit[] = [];

  edit_history_table_tracker = new ChangeTrackerBranchAudit();

  risk_level_intial: any;

  auditor_change_tracker: ChangeTrackerBranchAudit[] = [];
  reviewer_change_tracker: ChangeTrackerBranchAudit[] = [];
  approver_change_tracker: ChangeTrackerBranchAudit[] = [];
  row_detail_change_tracker: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker_list: ChangeTrackerBranchAudit[] = [];

  changer = new User();

  ref: DynamicDialogRef;

  audit_remark = new BranchFinancialAudit();
  auditRemarkDialog = false;

  unseenRemark = new RemarkBranchAudit();
  currentUser = new User();
  unseen_remark = 0;

  approver_id: number;

  editorConfig: any = {};

  uploadedFiles: any[] = [];
  fileInfos: Observable<any>;
  uploaded_files: any[];

  category = '';

  constructor(
    private auditService: ApproverBranchService,
    private fileService : BranchFinancialAuditService,
    private storageService: StorageService,
    private messageService: MessageService,
    private remarkService: RemarkBranchAuditService
  ) {}

  ngOnInit(): void {
    this.risk_levels = [
      { label: 'Very High', value: 'Very High' },
      { label: 'High', value: 'High' },
      { label: 'Medium', value: 'Medium' },
      { label: 'Low', value: 'Low' },
      { label: 'Very Low', value: 'Very Low' },
    ];

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'case_number', header: 'Case Number' },
      { field: 'status', header: 'Status' },
      { field: 'risk_level', header: 'Risk Level' },
      { field: 'finding_date', header: 'Date of Discrepancy' },
    ];

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

    this.approver_id = this.storageService.getUser().id;

    this.category = this.storageService.getUser().category;

    this.auditService.getApprovedAuditsStatus(this.approver_id).subscribe(
      (response) => {
        this.audits = response;
       this.loading=false;
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

  getFileUrls(audit: BranchFinancialAudit) {
    if(audit.file_urls)
    {
      this.fileInfos = this.fileService.getFilesByFileName(
        audit.file_urls
      );
    }
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

  getAuditorEditHistory(id: any, openDialog: Boolean): ChangeTrackerBranchAudit[] {
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

  getReviewerEditHistory(id: any, openDialog: Boolean): ChangeTrackerBranchAudit[] {
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

  getApproverEditHistory(id: any, openDialog: Boolean): ChangeTrackerBranchAudit[] {
    this.edit_history_table_tracker_list = [];
    let approver_id = this.storageService.getUser().id;
    this.audit_edit_history = this.audits.filter((audit) => audit.id == id);
    this.approver_change_tracker =
      this.audit_edit_history[0].change_tracker_branch_audit.filter(
        (change) => change.changer?.id == approver_id
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
}
