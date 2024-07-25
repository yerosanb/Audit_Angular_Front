import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IncompleteAccountAuditorBranchService } from 'app/branch_audit/incomplete-document-account/auditor/service/incomplete-account-auditor-branch.service';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';
import { Branches } from 'app/models/admin/branches';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment.prod';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { CashPerformanceAuditorService } from '../services/cash-performance-auditor.service';

@Component({
  selector: 'app-cash-performance-drafting',
  templateUrl: './cash-performance-drafting.component.html',
  styleUrls: ['./cash-performance-drafting.component.css'],
})
export class CashPerformanceDraftingComponent {
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
  risk_levels: any[];

  cols: any[];

  exportColumns: any[];

  auditor = new User();

  editorConfig: any = {};

  branch = new Branches();

  edit_history_table_tracker = new ChangeTrackerBranchAudit();

  risk_level_intial: any;

  auditor_change_tracker: ChangeTrackerBranchAudit[] = [];
  reviewer_change_tracker: ChangeTrackerBranchAudit[] = [];
  approver_change_tracker: ChangeTrackerBranchAudit[] = [];
  row_detail_change_tracker: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker_list: ChangeTrackerBranchAudit[] = [];

  isEditData = false;
  auditorFileInfos: Observable<any>;
  audits_to_be_exported: any[] = [];
  outputAudit: any[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private storageService: StorageService,
    private auditService: IncompleteAccountAuditorBranchService,
    private cashPerformanceAuditorService: CashPerformanceAuditorService
  ) {}

  ngOnInit() {
    let auditor_id = this.storageService.getUser().id;
    let category = this.storageService.getUser().category;
    this.getFindings(auditor_id);

    this.cols = [
      { field: 'case_number', header: 'Case Number' },
      { field: 'finding', header: 'Finding' },
      { field: 'impact', header: 'Impact' },
      { field: 'recommendation', header: 'Recommendation' },
      { field: 'accountable_staff', header: 'Accountable Staff' },
      { field: 'amount_shortage', header: 'Amount Shortage' },
      { field: 'amount_excess', header: 'Amount Excess' },
      { field: 'action_taken', header: 'Action Taken' },
      { field: 'risk_level', header: 'Risk Level' },
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
    this.cashPerformanceAuditorService
      .getDraftedCashPerformance(auditor_id)
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

  onDataChange(data: any) {
    if (data[1]) {
      let auditor_id = this.storageService.getUser().id;
      this.getFindings(auditor_id);
      this.audits = [...this.audits];
      this.auditEditDialog = false;
      this.audit = new BranchFinancialAudit();
    } else {
      this.audits[this.findIndexById(data[0].id)] = data[0];
    }
    this.auditEditDialog = false;
  }

  clear(table: Table) {
    table.clear();
  }

  deleteAudit(audit: BranchFinancialAudit) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + audit.case_number + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.auditService.deleteAudit(audit.id).subscribe({
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
  passAudit(audit: BranchFinancialAudit) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to pass ' + audit.case_number + ' to reviewer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.auditService.passAudit(audit.id).subscribe({
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

  deleteSelectedAudits() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected audits?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.auditService.deleteSelectedAudits(this.selectedAudits).subscribe({
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
  passSelectedAudits() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to pass the selected audits to reviewer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.auditService.passSelectedAudits(this.selectedAudits).subscribe({
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

  exportPdf() {
    // import('jspdf').then((jsPDF) => {
    //   import('jspdf-autotable').then((x) => {
    //     const doc = new jsPDF.default(0, 0);
    //     doc.autoTable(this.exportColumns, this.audits);
    //     doc.save('products.pdf');
    //   });
    // });
  }

  getChangeTrackerForRowDetail(audit: BranchFinancialAudit) {
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
}
