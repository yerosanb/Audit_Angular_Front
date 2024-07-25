import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { StorageService } from 'app/services/shared/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';
import { environment } from 'environments/environment';
import { BranchAuditNotificationServiceService } from '../service/branch-audit-notification-service.service';
import { Component } from '@angular/core';
import { User } from 'app/models/admin/user';
import { Region } from 'app/models/admin/region';
import { Branches } from 'app/models/admin/branches';
import { CompiledBranchAudit } from 'app/branch_audit/model/compiled-branch-audit';

@Component({
  selector: 'app-branch-audit-notification-higher-roles',
  templateUrl: './branch-audit-notification-higher-roles.component.html',
  styleUrls: ['./branch-audit-notification-higher-roles.component.css'],
})
export class BranchAuditNotificationHigherRolesComponent {
  environment = environment;
  auditEditDialog: boolean;
  editHistoryDialog: boolean;

  submitted: boolean;

  audits: CompiledBranchAudit[];
  audit = new CompiledBranchAudit();
  selectedAudits: CompiledBranchAudit[] = [];
  user = new User();

  approver = false;
  compiler = false;

  isLoggedIn = false;
  private roles: string[] = [];

  loading = true;

  region = new Region();

  branch = new Branches();

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private auditService: BranchAuditNotificationServiceService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    const userData = this.storageService.getUser();
    this.user.id = userData.id;
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.approver = this.roles.includes('ROLE_APPROVER_BFA');
      this.compiler = this.roles.includes('ROLE_COMPILER_BFA');
    }

    if (this.approver) {
      this.region.id = userData.region.id;
      this.user.region = this.region;
      this.get_notification_compiler(this.user);
    }

    if (this.compiler) {
      this.region.id = userData.region.id;
      this.user.region = this.region;
      this.get_notification_compiler(this.user);
    }
  }

  get_notification_compiler(user: User) {
    this.auditService.get_notification_compiler(user).subscribe(
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
