import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ControllableExpenseType } from 'app/branch_audit/model/ControllableExpense/controllable-expense-type';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';
import { Branches } from 'app/models/admin/branches';
import { User } from 'app/models/admin/user';
import { CommonFinding } from 'app/models/shared/audit/common-finding';
import { Recommendation } from 'app/services/approver/recommendation';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { ControllableExpenseService } from '../service/controllable-expense.service';

@Component({
  selector: 'app-controllable-expense-type',
  templateUrl: './controllable-expense-type.component.html',
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
  styleUrls: ['./controllable-expense-type.component.css'],
})
export class ControllableExpenseTypeComponent {
  environment = environment;
  public Editor = ClassicEditor;
  public findingEditor = ClassicEditor;
  public impactEditor = ClassicEditor;
  public recommendationEditor = ClassicEditor;
  auditEditDialog: boolean;
  editHistoryDialog: boolean;

  submitted: boolean;

  audits: ControllableExpenseType[];
  audit = new ControllableExpenseType();
  selectedAudits: ControllableExpenseType[] = [];
  audit_edit_history: ControllableExpenseType[];

  controllableExpenseType = new ControllableExpenseType();

  updated = false;
  errorMessage: String = '';
  loading = true;
  edit_auditee: Boolean = false;
  auditees: Branches[] = [];

  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];

  events1: any[];
  cash_type: any[];

  cols: any[];

  exportColumns: any[];

  auditor = new User();

  editorConfig: any = {};

  uploadedFiles: any[] = [];
  fileInfos: Observable<any>;
  uploaded_files: any[];

  selected_auditees: Branches[] = [];

  changeTrackerBranchAudit: ChangeTrackerBranchAudit[] = [];
  finding_change_tracker = new ChangeTrackerBranchAudit();
  impact_change_tracker = new ChangeTrackerBranchAudit();
  recommendation_change_tracker = new ChangeTrackerBranchAudit();
  cash_type_change_tracker = new ChangeTrackerBranchAudit();
  edit_history_table_tracker = new ChangeTrackerBranchAudit();

  cash_type_intial: any;

  auditor_change_tracker: ChangeTrackerBranchAudit[] = [];
  reviewer_change_tracker: ChangeTrackerBranchAudit[] = [];
  approver_change_tracker: ChangeTrackerBranchAudit[] = [];
  row_detail_change_tracker: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker_list: ChangeTrackerBranchAudit[] = [];

  changer = new User();

  commonFindings: CommonFinding[];
  commonFinding = new CommonFinding();
  is_new_finding = false;

  commonRecommendations: Recommendation[];
  commonRecommendation = new Recommendation();
  is_new_recommendation = false;

  category = '';

  constructor(
    private confirmationService: ConfirmationService,
    private storageService: StorageService,
    private controllableExpenseService: ControllableExpenseService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    let auditor_id = this.storageService.getUser().id;
    this.category = this.storageService.getUser().category;
    this.getFindings(auditor_id);

    this.cash_type = [
      { label: 'LCY', value: 'LCY' },
      { label: 'FCY', value: 'FCY' },
    ];

    this.cols = [
      { field: 'case_number', header: 'Case Number' },
      { field: 'finding', header: 'Finding' },
      { field: 'impact', header: 'Impact' },
      { field: 'recommendation', header: 'Recommendation' },
      { field: 'amount', header: 'Amount' },
      { field: 'finding_date', header: 'Date of Discrepancy' },
      { field: 'review_status', header: 'Review Status' },
      { field: 'approve_status', header: 'Approve Status' },
      { field: 'account_number', header: 'account Number' },
      { field: 'average_cash_holding', header: ' Average Cash Holding' },
      { field: ' branch_cash_set_limit', header: ' Cash Set Limit' },
      { field: 'description', header: ' Description' },
      { field: 'cash_type', header: ' Currency Type' },
      { field: 'name', header: ' Name' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  getFindings(auditor_id: number) {
    this.controllableExpenseService.getControllableExpenseType().subscribe(
      (response) => {
        this.audits = response;
        this.loading = false;
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
    this.audit = new ControllableExpenseType();
    this.submitted = false;
    this.recommendation_change_tracker = {};
    this.controllableExpenseType = {};
    this.impact_change_tracker = {};
    this.finding_change_tracker = {};
    this.auditEditDialog = true;
    this.selected_auditees = [];
  }

  editAudit(audit: ControllableExpenseType) {
    this.audit = { ...audit };
    // if (this.audit.is_MGTAuditee)
    //   for (let is_MGTAuditee of this.audit.is_MGTAuditee) {
    //     if (is_MGTAuditee.auditee)
    //       this.selected_auditees.push(is_MGTAuditee.auditee);
    //   }
    // this.getAuditees();
    // this.controllableExpenseType = audit.controllableExpenseType? audit.controllableExpenseType: new ControllableExpenseType();
    this.auditEditDialog = true;
    //  this.cash_type_intial = audit.controllableExpenseType?.cash_type;
    this.recommendation_change_tracker = {};
    this.impact_change_tracker = {};
    this.finding_change_tracker = {};
    this.changeTrackerBranchAudit = [];
  }

  clear(table: Table) {
    table.clear();
  }

  deleteAudit(audit: ControllableExpenseType) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.controllableExpenseService.deleteAudits(audit.id).subscribe({
          next: (response) => {
            this.audits = this.audits.filter((val) => val.id !== audit.id);
            this.audit = new ControllableExpenseType();
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
  deleteSelectedAudits() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected audits?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.controllableExpenseService
          .deleteSelectedAudits(this.selectedAudits)
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

  saveControllableExpenseType() {
    this.submitted = true;

    this.controllableExpenseService.create_audit(this.audit).subscribe({
      next: (response) => {
        if (this.audit.id) {
          this.audits[this.findIndexById(this.audit.id)] = this.audit;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Audit Updated',
            life: 3000,
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Audit Created',
            life: 3000,
          });
          let auditor_id = this.storageService.getUser().id;
          this.getFindings(auditor_id);
          this.audits = [...this.audits];
          this.auditEditDialog = false;
          this.audit = new ControllableExpenseType();
        }
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = error.message;
        this.submitted = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while either creating or updating finding!',
          life: 3000,
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
}
