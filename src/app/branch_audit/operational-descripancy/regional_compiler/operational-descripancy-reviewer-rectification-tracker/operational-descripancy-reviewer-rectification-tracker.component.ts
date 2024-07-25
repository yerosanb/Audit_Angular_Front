
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { StorageService } from 'app/services/shared/storage.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { User } from 'app/models/admin/user';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { RectificationTrackerService } from 'app/branch_audit/common/service/rectification-tracker.service';
import { CommonReviewerBranchFinancialService } from 'app/branch_audit/regional_compiled_audits/service/common-reviewer-branch-financial.service';
@Component({
  selector: 'app-operational-descripancy-reviewer-rectification-tracker',
  templateUrl: './operational-descripancy-reviewer-rectification-tracker.component.html',
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

  styleUrls: ['./operational-descripancy-reviewer-rectification-tracker.component.css']

})
export class OperationalDescripancyReviewerRectificationTrackerComponent {
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
  edit_auditee: Boolean = false;
  reviewer: User = new User();
  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];
  cols: any[];


  editHistoryDialog: Boolean = false;

  fileInfos: Observable<any>;

  category = '';

  audits_to_be_compiled: any[] = [];

  outputBranchFinancialAudit: BranchFinancialAudit[] = [];
  auditeeResponseDialog = false;

  audits_rectification: BranchFinancialAudit[] = [];
  audit_rectification = new BranchFinancialAudit();
  reciever = new User();

  audit_info = new BranchFinancialAudit();


  _selectedColumns: any[];

  constructor(
    private storageService: StorageService,
    private fileService: BranchFinancialAuditService,
    private messageService: MessageService,
    private rectificationTrackerService: RectificationTrackerService,
    private confirmationService: ConfirmationService,
    private commonService: CommonReviewerBranchFinancialService
  ) {}

  ngOnInit(): void {
    let user = this.storageService.getUser();
    this.reciever.id = user.id;
    this.audit_info.reciever = this.reciever;
    this.audit_info.audit_type = 'OperationalDescripancy';
    this.category = this.storageService.getUser().category;

    this.rectificationTrackerService
      .getUnseenRectificationsAudits(this.audit_info)
      .subscribe(
        (response) => {
          this.audits = response;
          this.loading = false;
        },

        (error) => (error: HttpErrorResponse) => {
          this.errorMessage = error.error.message;
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
        // { field: 'branch_name', header: 'Branch Name' },
        // { field: 'audit_case_number', header: 'Case Number' },
        { field: 'cash_type', header: 'Currency Type' },
        { field: 'operational_category', header: 'Category' },
        { field: 'account_number', header: 'Account Number' },
        { field: 'acount_holder_name', header: 'Account Holder Name' },
        { field: 'amount', header: 'Amount' },
        { field: 'transaction_date', header: 'Reporting Date' },
        { field: 'finding_date', header: 'Date of Discrepancy' },
        // { field: 'rectification_status', header: 'Rectification Status' },
        { field: 'rectification_date', header: 'Rectification Date' },
        // { field: 'audit_finding', header: 'Finding' },
        // { field: 'audit_impact', header: 'Impact' },
        // { field: 'audit_recommendation', header: 'Recommendation'},
        // { field: 'finding_detail', header: 'Finding Detail'}

    ];
    this._selectedColumns = this.cols;
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
}

set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter(col => val.includes(col));
}

isString(value: any): boolean {
  return typeof value === 'string';
}

isNumber(value: any): boolean {
  return typeof value === 'number';
}

isBoolean(value: any): boolean {
  return typeof value === 'boolean';
}

isDate(value: any): boolean {
  return value instanceof Date;
}
//containsAnyField function checks if any of the fields in the fieldsToCheck array are present in the cols array. It returns true if any field is present, and false otherwise
containsAnyField(array: any[], fields: string[]): boolean {
  return fields.some(field => array.some(item => item.field === field));
}

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }



  addAuditeeResponse(audit: BranchFinancialAudit) {
    this.audit = audit;
    this.outputBranchFinancialAudit = [];
    this.outputBranchFinancialAudit.push(this.audit);
    this.auditeeResponseDialog = true;
  }

  onDataChangeAuditeeResponse(data: BranchFinancialAudit[]) {
    if (data) {
      for (const dt of data) {
        if (dt.id) this.audits[this.findIndexById(dt.id)] = dt;
      }
    }
    this.auditeeResponseDialog = false;
  }


  makeSelectedFindingsSeen() {
    this.reciever.id = this.storageService.getUser().id;
    this.selectedAudits[0].reciever = this.reciever;
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




  hideDialog() {
    this.editHistoryDialog = false;
    this.auditeeResponseDialog = false;
    this.submitted = false;
  }
}

