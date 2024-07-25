import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RectificationTrackerService } from 'app/branch_audit/common/service/rectification-tracker.service';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { CommonReviewerBranchFinancialService } from 'app/branch_audit/regional_compiled_audits/service/common-reviewer-branch-financial.service';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment.prod';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-asset-liability-reviewer-rectification-tracker',
  templateUrl: './asset-liability-reviewer-rectification-tracker.component.html',
  styleUrls: ['./asset-liability-reviewer-rectification-tracker.component.css']
})
export class AssetLiabilityReviewerRectificationTrackerComponent implements OnInit {
  environment = environment;
  public Editor = ClassicEditor;
  audits: BranchFinancialAudit[] = [];
  selectedAudits: BranchFinancialAudit[] = [];
  loading = true;
  errorMessage: String = '';
  audit_info = new BranchFinancialAudit();
  reciever = new User();
  category = '';
  submitted = false;
  fileInfos: Observable<any>;
  audit = new BranchFinancialAudit();
  outputBranchFinancialAudit: BranchFinancialAudit[] = [];
  auditeeResponseDialog = false;
  editHistoryDialog: Boolean = false;
  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];

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
    this.audit_info.audit_type = 'AssetLiability';
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

  exportPdf() {
    // import('jspdf').then((jsPDF) => {
    //   import('jspdf-autotable').then((x) => {
    //     const doc = new jsPDF.default(0, 0);
    //     doc.autoTable(this.exportColumns, this.audits);
    //     doc.save('products.pdf');
    //   });
    // });
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

  getFileUrls(audit: BranchFinancialAudit) {
    if (audit.file_urls) {
      this.fileInfos = this.fileService.getFilesByFileName(audit.file_urls);
    }
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

  hideDialog() {
    this.editHistoryDialog = false;
    this.auditeeResponseDialog = false;
    this.submitted = false;
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }

}
