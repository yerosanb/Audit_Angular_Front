


import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { RemarkBranchAuditService } from 'app/branch_audit/services/remark-branch-audit.service';
import { Branches } from 'app/models/admin/branches';
import { Region } from 'app/models/admin/region';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { LongOutstandingItemBranchManagerService } from '../service/long-outstanding-item-branch-manager.service';


@Component({
  selector: 'app-long-outstanding-item-branch-manager',
  templateUrl: './long-outstanding-item-branch-manager.component.html',
  styleUrls: ['./long-outstanding-item-branch-manager.component.css']
})
export class LongOutstandingItemBranchManagerComponent {


  environment = environment;
  public Editor = ClassicEditor;
  public findingEditor = ClassicEditor;
  public impactEditor = ClassicEditor;
  public recommendationEditor = ClassicEditor;
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
  user_type = new User();
  editorConfig: any = {};
  uploadedFiles: any[] = [];
  fileInfos: Observable<any>;
  uploaded_files: any[];
  selected_auditees: Branches[] = [];
  changer = new User();
  branches: Branches[] = [];
  regions: Region[] = [];
  branchSelected: boolean = false;
  regionSelected: boolean = false;
  branchOptions: Branches[] = [];
  regionOptions: Region[] = [];
  loadLazyTimeout: any;
  branch = new Branches();
  region = new Region();

  auditeeResponseDialog = false;
  outputBranchFinancialAudit : BranchFinancialAudit[] = []

  audit_remark = new BranchFinancialAudit();
  auditRemarkDialog = false;

  unseenRemark = new RemarkBranchAudit();
  currentUser = new User();
  unseen_remark = 0;



  constructor(
    private messageService: MessageService,
    private storageService: StorageService,
    private longOutstandingItemBranchManagerService: LongOutstandingItemBranchManagerService,
    private fileService: BranchFinancialAuditService,

  private remarkService: RemarkBranchAuditService,


  ) { }

  ngOnInit() {
   let branch_id= this.storageService.getUser().branch?.id;
    this.branchOptions = Array.from({ length: 1000 });
    this.regionOptions = Array.from({ length: 1000 });
    this.getFindings(branch_id);


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
  }

  getFindings(branch_audit: any) {
    this.longOutstandingItemBranchManagerService.getPendingAudits(branch_audit).subscribe(
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





  hideDialog() {
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
    this.getUnseenRemarks(audit)
      }

  getFileUrls(audit: BranchFinancialAudit) {
    if(audit.file_urls)
    {
      this.fileInfos = this.fileService.getFilesByFileName(
        audit.file_urls
      );
    }
  }

  rectifyAudit(audit: BranchFinancialAudit) {
    this.user_type.id = this.storageService.getUser().id
    this.audit = audit;
    this.audit.auditee= this.user_type
    this.audit.category = this.storageService.getUser().category
    this.outputBranchFinancialAudit.push(this.audit);
    this.auditeeResponseDialog = true;
  }

  onDataChange(data: BranchFinancialAudit[]) {
    if(data)
    {
      this.audits = this.audits.filter(
        (val) => !data.includes(val)
      );

    }
  }

  rectifySelectedAudits() {

    this.user_type.id = this.storageService.getUser().id
    this.auditeeResponseDialog = true;
    this.user_type.id = this.storageService.getUser().id
    this.selectedAudits[0].auditee = this.user_type
    this.outputBranchFinancialAudit = this.selectedAudits;
    this.auditeeResponseDialog = true;

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

  openRemarkModal(audit: BranchFinancialAudit) {
    this.audit_remark = { ...audit };
    this.auditRemarkDialog = true;
  }



}
