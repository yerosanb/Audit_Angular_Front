
import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Branches } from 'app/models/admin/branches';
import { User } from 'app/models/admin/user';
import { ChangeTrackerISM } from 'app/models/shared/ism/change-tracker-ism';
import { environment } from 'environments/environment.prod';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { BranchManagerResponseService } from 'app/branch_audit/common/service/branch-manager-response.service';
import { IncompleteAccountAuditorBranchService } from 'app/branch_audit/incomplete-document-account/auditor/service/incomplete-account-auditor-branch.service';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { RemarkBranchAuditService } from 'app/branch_audit/services/remark-branch-audit.service';
import { StorageService } from 'app/services/shared/storage.service';
import * as FileSaver from 'file-saver';
import { Table } from 'primeng/table';
import { CashPerformanceAuditorService } from '../services/cash-performance-auditor.service';
@Component({
  selector: 'app-cash-performance-passed',
  templateUrl: './cash-performance-passed.component.html',
  styleUrls: ['./cash-performance-passed.component.css']
})
export class CashPerformancePassedComponent {
  environment = environment;
  public Editor = ClassicEditor;
  public findingEditor = ClassicEditor;
  public impactEditor = ClassicEditor;
  public recommendationEditor = ClassicEditor;
  auditEditDialog: boolean;
  editHistoryDialog: boolean;
  public accountable_staffEditor=ClassicEditor;
 public  action_takenEditor=ClassicEditor
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
  risk_levels: any[];

  cols: any[];

  exportColumns: any[];

  auditor = new User();

  editorConfig: any = {};

  uploadedFiles: any[] = [];
  fileInfos: Observable<any>;
  uploaded_files: any[];

  selected_auditees: Branches[] = [];

  change_tracker_ISM: ChangeTrackerISM[] = [];
  finding_change_tracker = new ChangeTrackerISM();
  impact_change_tracker = new ChangeTrackerISM();
  recommendation_change_tracker = new ChangeTrackerISM();
  risk_level_change_tracker = new ChangeTrackerISM();
  edit_history_table_tracker = new ChangeTrackerISM();
  action_taken_change_tracker=new ChangeTrackerISM();


  risk_level_intial: any;

  auditor_change_tracker: ChangeTrackerISM[] = [];
  reviewer_change_tracker: ChangeTrackerISM[] = [];
  approver_change_tracker: ChangeTrackerISM[] = [];
  row_detail_change_tracker: ChangeTrackerISM[] = [];
  edit_history_table_tracker_list: ChangeTrackerISM[] = [];
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
    private cashPerformanceAuditorService:CashPerformanceAuditorService,
    private auditeeResponseService: BranchManagerResponseService,
    private auditService: IncompleteAccountAuditorBranchService,
  ) {}

  ngOnInit() {
    let auditor_id = this.storageService.getUser().id;
    this.getFindings(auditor_id);

    this.risk_levels = [
      { label: 'Very High', value: 'Very High' },
      { label: 'High', value: 'High' },
      { label: 'Medium', value: 'Medium' },
      { label: 'Low', value: 'Low' },
      { label: 'Very Low', value: 'Very Low' },
    ];

    this.cols = [
      { field: 'case_number', header: 'Case Number' },
      { field: 'finding', header: 'Finding' },
      { field: 'impact', header: 'Impact' },
      { field: 'recommendation', header: 'Recommendation' },
      { field: 'accountable_staff', header: 'Accountable Staff' },
      { field: 'amount_shortage', header: 'Amount Shortage' },
      { field: 'amount_excess', header: 'Amount Excess' },
      { field: 'action_taken', header: 'Action Taken' },
      // { field: 'risk_level', header: 'Risk Level' },
      { field: 'finding_date', header: 'Date of Discrepancy' },
      // { field: 'review_status', header: 'Review Status' },
      // { field: 'approve_status', header: 'Approve Status' },

    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  getFindings(auditor_id: number) {
    this.cashPerformanceAuditorService.getPassedCashPerformance(auditor_id).subscribe(
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
                detail: 'cash performance rectified',
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
                    : 'Something went wrong while rectifiying cash performance!',
                detail: '',
              });
            },
          });
      },
    });
  }

  addAuditeeResponseForSelectedAudits() {
    this.auditeeResponseDialog = true;
    this.outputBranchFinancialAudit = this.selectedAudits;
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
                detail: 'Cash Performance rectified',
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
                    : 'Something went wrong while rectifiying cash performance!',
                detail: '',
              });
            },
          });
      },
    });
  }

  addAuditeeResponse(audit: BranchFinancialAudit) {
    this.audit = audit;
    this.outputBranchFinancialAudit.push(this.audit);
    this.auditeeResponseDialog = true;
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
        this.auditService.backAudit(audit.id).subscribe({
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
       // if (audit?.is_MGTAuditee) {
    //   if (audit?.is_MGTAuditee[0].auditeeDivisionISM)
    //     this.uploaded_files =
    //       audit?.is_MGTAuditee[0]?.auditeeDivisionISM[0]?.uploaded_files?.map(
    //         (AuditeeDivisionFileIsm) => AuditeeDivisionFileIsm.file_url
    //       ) as any;
    // }
      // this.fileInfos = this.auditeeISMService.getFilesByFileName(
    //   this.uploaded_files
    // );
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
        this.auditService.backSelectedAudits(this.selectedAudits).subscribe({
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
    this.auditeeResponseDialog = false;
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
    this.getFileUrls(audit);
    this.getUnseenRemarks(audit);
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

  getAuditorEditHistory(id: any, openDialog: Boolean): ChangeTrackerISM[] {
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

  getReviewerEditHistory(id: any, openDialog: Boolean): ChangeTrackerISM[] {
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

  getApproverEditHistory(id: any, openDialog: Boolean): ChangeTrackerISM[] {
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

  openRemarkModal(audit: BranchFinancialAudit) {
    this.audit_remark = { ...audit };
    this.auditRemarkDialog = true;
  }

  getUnseenRemarks(audit: BranchFinancialAudit) {
    // this.unseenRemark.audit = audit;
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
