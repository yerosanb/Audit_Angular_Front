import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { RemarkBranchAuditService } from 'app/branch_audit/services/remark-branch-audit.service';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { IncompleteAcountBranchManagerService } from '../service/incomplete-acount-branch-manager.service';
@Component({
  selector: 'app-incomplete-document-pending-branch-manager',
  templateUrl: './incomplete-document-pending-branch-manager.component.html',
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

  styleUrls: ['./incomplete-document-pending-branch-manager.component.css'],
})
export class IncompleteDocumentPendingBranchManagerComponent {
  environment = environment;

  public Editor = ClassicEditor;

  errorMessage: String = '';
  loading = true;

  audits: BranchFinancialAudit[] = [];
  selectedAudits: BranchFinancialAudit[] = [];
  edit_auditee: Boolean = false;
  reviewer: User = new User();
  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];
  cols: any[];
  fileInfos: Observable<any>;
  category = '';
  audits_to_be_compiled: any[] = [];
  reciever = new User();
  audit_info = new BranchFinancialAudit();
  _selectedColumns: any[];
  unseenRemark = new RemarkBranchAudit();
  currentUser = new User();
  unseen_remark = 0;
  audit_remark = new BranchFinancialAudit();
  auditRemarkDialog = false;

  constructor(
    private storageService: StorageService,
    private incompleteAccountBranchManagerService: IncompleteAcountBranchManagerService,
    private fileService: BranchFinancialAuditService,
    private messageService: MessageService,
    private remarkService: RemarkBranchAuditService
  ) {}

  ngOnInit(): void {
    let user = this.storageService.getUser();
    this.getFindings(user.branch.id);
    this.cols = [
      // { field: 'branch_name', header: 'Branch Name' },
      // { field: 'audit_case_number', header: 'Case Number' },
      { field: 'account_type', header: 'Account Type' },
      { field: 'account_number', header: 'Account Number' },
      { field: 'customer_name', header: 'Customer Name' },
      { field: 'account_opened_date', header: 'Account Opened Date' },
      { field: 'opened_by', header: 'Opened By' },
      { field: 'approved_by', header: 'Approved By' },
      { field: 'account_opened_amount', header: 'Amount Opened' },
      { field: 'finding_date', header: 'Date of Discrepancy' },
    ];
    this._selectedColumns = this.cols;
  }

  getFindings(branch_audit: any) {
    this.incompleteAccountBranchManagerService
      .getPendingAudits(branch_audit)
      .subscribe(
        (response) => {
          this.audits = response;
          this.loading = false;
          //console.log(this.audits);
        },
        (error) => (error: HttpErrorResponse) => {
          this.loading = false;
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

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
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
    return fields.some((field) => array.some((item) => item.field === field));
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

  getChangeTrackerForRowDetail(audit: BranchFinancialAudit) {
    this.getFileUrls(audit);
    this.getUnseenRemarks(audit);
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
