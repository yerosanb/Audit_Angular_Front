
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { Branches } from 'app/models/admin/branches';
import { Region } from 'app/models/admin/region';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BranchAuditNotificationServiceService } from '../service/branch-audit-notification-service.service';

@Component({
  selector: 'app-branch-audit-notification-lower-roles',
  templateUrl: './branch-audit-notification-lower-roles.component.html',
  styleUrls: ['./branch-audit-notification-lower-roles.component.css']
})
export class BranchAuditNotificationLowerRolesComponent {
  environment = environment;
  auditEditDialog: boolean;
  editHistoryDialog: boolean;

  submitted: boolean;

  audits: BranchFinancialAudit[];
  audit = new BranchFinancialAudit();
  selectedAudits: BranchFinancialAudit[] = [];
  user = new User();

  approver = false;
  reviewer = false;
  compiler = false;
  auditor = false;
  branch_manger = false;

  isLoggedIn = false;
  private roles: string[] = [];

  loading = true

  region = new Region();

  branch = new Branches();




  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private auditService: BranchAuditNotificationServiceService,
    private storageService: StorageService,

  ) {}

  ngOnInit() {
    const userData = this.storageService.getUser();
    this.user.id = userData.id
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.approver = this.roles.includes('ROLE_APPROVER_BFA');
      this.reviewer = this.roles.includes('ROLE_REVIEWER_BFA');
      this.auditor = this.roles.includes('ROLE_AUDITOR_BFA');
      this.compiler = this.roles.includes('ROLE_COMPILER_BFA');
      this.branch_manger = this.roles.includes('ROLE_BRANCHM_BFA');
    }

    if(this.reviewer)
    {
      this.region.id = userData.region.id;
      this.user.region = this.region
      this.user.category = "Reviewer"
      this.get_notification_r_m(this.user)
    }

    if(this.branch_manger)
    {
      this.branch.id = userData.branch.id;
      this.user.branch = this.branch
      this.user.category = "BranchManager"
      this.get_notification_r_m(this.user)
    }

  }

  get_notification_r_m(user: User) {
    this.auditService.get_notification_r_m(user).subscribe(
      (response) => {
        this.audits = response;
        this.loading = false;
      },
      () => (error: HttpErrorResponse) => {
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



  clear(table: Table) {
    table.clear();
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

}


