import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { StorageService } from 'app/services/shared/storage.service';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { environment } from 'environments/environment';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { IncompleteAccountAuditorBranchService } from '../service/incomplete-account-auditor-branch.service';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { User } from 'app/models/admin/user';
import { RemarkBranchAuditService } from 'app/branch_audit/services/remark-branch-audit.service';
@Component({
  selector: 'app-incomplete-account-on-progress-branch',
  templateUrl: './incomplete-account-on-progress-branch.component.html',
  styleUrls: ['./incomplete-account-on-progress-branch.component.css'],
})
export class IncompleteAccountOnProgressBranchComponent {
  environment = environment;
  audits: BranchFinancialAudit[] = [];

  loading = true;

  audit_remark = new BranchFinancialAudit();
  auditRemarkDialog = false;

  unseenRemark = new RemarkBranchAudit();
  currentUser = new User();
  unseen_remark = 0;

  constructor(
    private auditService: IncompleteAccountAuditorBranchService,
    private storageService: StorageService,
    private messageService: MessageService,
    private remarkService: RemarkBranchAuditService
  ) {}

  ngOnInit(): void {
    let user = this.storageService.getUser();
    this.auditService.getAuditsOnProgressForAuditor(user.id).subscribe(
      (response) => {
        this.audits = response;
        this.loading = false;
      },
      (error) => (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while retrieving findings!',
          detail: '',
        });
      }
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
  hideDialog() {
    this.auditRemarkDialog = false;
  }

  openRemarkModal(audit: BranchFinancialAudit) {
    this.audit_remark = { ...audit };
    this.auditRemarkDialog = true;
    this.getUnseenRemarks(audit);
  }

  getUnseenRemarks(audit: BranchFinancialAudit) {
    this.unseenRemark.branchFinancialAudit = audit;
    this.currentUser.id = this.storageService.getUser().id;
    this.unseenRemark.reciever = this.currentUser;
    this.remarkService.getUnseenRemarks(this.unseenRemark).subscribe({
      next: (res) => {
        this.unseen_remark = res.length;
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
