import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Currency } from 'app/branch_audit/common/currency/currency';
import { CurrencyService } from 'app/branch_audit/common/currency/currency.service';
import { DataPoolingServiceBranchService } from 'app/branch_audit/common/service/data-pooling-service-branch.service';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { CommonReviewerBranchFinancialService } from 'app/branch_audit/regional_compiled_audits/service/common-reviewer-branch-financial.service';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { RemarkBranchAuditService } from 'app/branch_audit/services/remark-branch-audit.service';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { OperationalDescripancyPooledData } from '../../data-pooling-branch/operational-descripancy-pooled-data';
import { OperationalDescripancyRegionalCompilerService } from '../service/operational-descripancy-regional-compiler.service';

@Component({
  selector: 'app-operational-descripancy-reviewed-regional',
  templateUrl: './operational-descripancy-reviewed-regional.component.html',
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
  styleUrls: ['./operational-descripancy-reviewed-regional.component.css'],
})
export class OperationalDescripancyReviewedRegionalComponent {
  environment = environment;
  public Editor = ClassicEditor;

  auditEditDialog: boolean;
  editHistoryDialog: boolean;

  submitted: boolean;

  audits: BranchFinancialAudit[];
  audit = new BranchFinancialAudit();
  selectedAudits: BranchFinancialAudit[] = [];
  filteredAudits: BranchFinancialAudit[] = [];
  audit_edit_history: BranchFinancialAudit[];

  loading = true;
  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];

  cols: any[];

  exportColumns: any[];

  fileInfos: Observable<any>;

  edit_history_table_tracker = new ChangeTrackerBranchAudit();

  auditor_change_tracker: ChangeTrackerBranchAudit[] = [];
  reviewer_change_tracker: ChangeTrackerBranchAudit[] = [];
  approver_change_tracker: ChangeTrackerBranchAudit[] = [];
  row_detail_change_tracker: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker_list: ChangeTrackerBranchAudit[] = [];
  reviewer = new User();

  passAudits: BranchFinancialAudit[] = [];

  audit_remark = new BranchFinancialAudit();
  auditRemarkDialog = false;

  unseenRemarkBranchAudit = new RemarkBranchAudit();
  currentUser = new User();
  unseen_remark = 0;
  category = '';

  outputData: any[] = [];
  compile_ui = false;

  audits_to_be_compiled: Number[] = [];

  poolData = new OperationalDescripancyPooledData();
  poolDialog = false;

  cash_type_valid: boolean = false;

  currency: Currency[] = [];

  is_fcy = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private storageService: StorageService,
    private fileService: BranchFinancialAuditService,
    private regionalCompilerService: OperationalDescripancyRegionalCompilerService,
    private remarkService: RemarkBranchAuditService,
    private commonService: CommonReviewerBranchFinancialService,
    private poolingService: DataPoolingServiceBranchService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    let reviewer_id = this.storageService.getUser().id;
    this.getFindings(reviewer_id);
    this.cols = [
      { field: 'case_number', header: 'Case Number' },
      { field: 'finding', header: 'Finding' },
      { field: 'impact', header: 'Impact' },
      { field: 'recommendation', header: 'Recommendation' },
      { field: 'account_holder_name', header: 'Account Holder Name' },
      { field: 'account_number', header: 'Account Number' },
      { field: 'amount', header: 'Amount' },
      { field: 'transaction_date', header: 'Reporting Date' },
      {
        field: 'operationalDescripancyCategory',
        header: 'Transaction Related Findings  Category',
      },
      { field: 'review_status', header: 'Review Status' },
      { field: 'approve_status', header: 'Approve Status' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  getFindings(reviewer_id: any) {
    this.regionalCompilerService.getReviewedFindings(reviewer_id).subscribe(
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

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }

  clear(table: Table) {
    table.clear();
  }

  getCurrency() {
    this.currencyService.getCurrency().subscribe({
      next: (data) => {
        this.currency = data;
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while fetching currencies!',
          detail: '',
        });
      },
    });
  }

  changeCashType(cash_type: any) {
    if (cash_type == 'FCY') {
      this.getCurrency();
      this.is_fcy = true;
    } else {
      this.is_fcy = false;
    }
    this.cash_type_valid = cash_type.length != 0 ? true : false;
  }

  openPoolDialog() {
    this.poolDialog = true;
    this.poolData = new OperationalDescripancyPooledData();
  }

  filterAudits() {
    this.filteredAudits = []
    // Assuming you have an array of audit objects called audits
    this.filteredAudits = this.selectedAudits.filter((audit) => {
      // Check if the operational_descripancy object has an amount greater than the given amount
      const operational_descripancy = audit.operationalDescripancyBranch;

      if (operational_descripancy && this.poolData)
        if (operational_descripancy.amount && this.poolData.pool_amount)
          if (operational_descripancy.amount <= this.poolData.pool_amount) {
            // Check if the cash_type is the given Currency Type
            const cash_type = operational_descripancy.cash_type;
            if (cash_type === this.poolData.cash_type) {
              // Check if the fcy attribute is the given fcy
              const fcy = operational_descripancy.fcy;
              if (this.is_fcy) {
                if (fcy === this.poolData.fcy) {
                  // Return true if all conditions are met
                  return true;
                }
              } else {
                return true;
              }
            }
          }
      // Return false otherwise
      return false;
    });

    if (this.filteredAudits.length >= 1) {
      this.addToPoolSelectedFindings();
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Please select at least one audit!',
        detail: '',
      });
    }
  }

  addToPoolSelectedFindings() {
    this.poolData.branchFinancialAudits = this.filteredAudits;
    this.poolData.pooler = this.storageService.getUser().id;
    this.confirmationService.confirm({
      message:
        'Are you sure you want to pool ' +
        this.filteredAudits.length +
        ' audits that are <= ' +
        this.poolData.pool_amount +
        ' ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.poolingService.addToPool(this.poolData).subscribe({
          next: (response) => {
            this.audits = this.audits.filter(
              (val) => !this.filteredAudits.includes(val)
            );
            this.selectedAudits = [];
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Audits Pooled',
              life: 3000,
            });
          },
          error: (error: HttpErrorResponse) => {
            this.loading = false;
            this.messageService.add({
              severity: 'error',
              summary:
                error.status == 401
                  ? 'You are not permitted to perform this action!'
                  : 'Something went wrong while pooling findings!',
              detail: '',
            });
          },
        });
      },
    });
  }

  unreviewSelectedFindings() {
    this.reviewer.id = this.storageService.getUser().id;
    this.selectedAudits[0].reviewer = this.reviewer;
    this.confirmationService.confirm({
      message: 'Are you sure you want to Review audits ?',
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
              this.messageService.add({
                severity: 'error',
                summary:
                  error.status == 401
                    ? 'You are not permitted to perform this action!'
                    : 'Something went wrong while reviewing findings!',
                detail: '',
              });
            },
          });
      },
    });
  }

  unreviewFinding(audit: BranchFinancialAudit) {
    this.reviewer.id = this.storageService.getUser().id;
    this.audit = audit;
    this.audit.reviewer = this.reviewer;
    this.passAudits.push(this.audit);
    this.confirmationService.confirm({
      message: 'Are you sure you want to review the given audit ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commonService
          .unReviewMultiAuditfinding(this.passAudits)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter((val) => val.id !== audit.id);
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

  compileAudits() {
    let selected_audits_account_type: Number[] | any;
    if (this.selectedAudits) {
      selected_audits_account_type = this.selectedAudits
        .filter(
          (branchFinancialAudit: BranchFinancialAudit) =>
            branchFinancialAudit?.operationalDescripancyBranch
              ?.operationalDescripancyCategory?.id
        )
        .map(
          (branchFinancialAudit: BranchFinancialAudit) =>
            branchFinancialAudit?.operationalDescripancyBranch
              ?.operationalDescripancyCategory?.id
        );
    }
    if (selected_audits_account_type) {
      this.audits_to_be_compiled = selected_audits_account_type;
      if (this.areAllEqual(this.audits_to_be_compiled)) {
        this.outputData.push(this.selectedAudits);
        this.outputData.push('OperationalDiscrepancy');
        this.compile_ui = true;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Please select audits with the same category',
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
    this.auditEditDialog = false;
    this.submitted = false;
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

  getAuditorEditHistory(
    id: any,
    openDialog: Boolean
  ): ChangeTrackerBranchAudit[] {
    this.edit_history_table_tracker_list = [];
    this.audit_edit_history = this.audits.filter((audit) => audit.id == id);
    this.auditor_change_tracker =
      this.audit_edit_history[0].change_tracker_branch_audit!.filter(
        (change) =>
          change.changer?.id == this.audit_edit_history[0].reviewer?.id
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
    this.reviewer_change_tracker =
      this.audit_edit_history[0].change_tracker_branch_audit!.filter(
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
      this.audit_edit_history[0].change_tracker_branch_audit!.filter(
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

  openRemarkModal(audit: BranchFinancialAudit) {
    this.audit_remark = { ...audit };
    this.auditRemarkDialog = true;
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
}
