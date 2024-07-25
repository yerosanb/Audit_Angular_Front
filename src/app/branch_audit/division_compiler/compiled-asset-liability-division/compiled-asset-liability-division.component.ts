import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { RemarkCompiledBranchAuditService } from 'app/branch_audit/common/remark-branch-audit/service/remark-compiled-branch-audit.service';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { CompiledBranchAudit } from 'app/branch_audit/model/compiled-branch-audit';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DivisionCompilerService } from '../services/division-compiler.service';
@Component({
  selector: 'app-compiled-asset-liability-division',
  templateUrl: './compiled-asset-liability-division.component.html',
  styleUrls: ['./compiled-asset-liability-division.component.css'],
})
export class CompiledAssetLiabilityDivisionComponent {
  compiledBranchAudits: CompiledBranchAudit[] = [];
  compiledBranchAudit = new CompiledBranchAudit();
  selectedAudits: CompiledBranchAudit[] = [];
  passAudits: CompiledBranchAudit[] = [];
  compiler = new User();

  category = '';
  loading = true;

  fileInfos: Observable<any>;
  filesDialog = false;

  parameters: String[] = [];

  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];

  audit_remark = new CompiledBranchAudit();
  auditRemarkDialog = false;

  unseenRemark = new RemarkBranchAudit();
  currentUser = new User();
  unseen_remark = 0;

  // Asset and Liability
  total_asset_amount = 0;
  total_liability_amount = 0;

  total_asset_amount_fcy = 0;
  total_liability_amount_fcy = 0;

  constructor(
    private compilerService: DivisionCompilerService,
    private storageService: StorageService,
    private fileService: BranchFinancialAuditService,
    private remarkService: RemarkCompiledBranchAuditService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    let user = this.storageService.getUser();
    this.category = this.storageService.getUser().category;

    this.parameters.push(this.category);
    this.parameters.push('AssetLiability');

    this.compilerService.getPendingAudits(this.parameters).subscribe(
      (response) => {
        this.compiledBranchAudits = response;
        console.log(this.compiledBranchAudits);
        this.loading = false;
      },

      (error) => (error: HttpErrorResponse) => {
        this.loading=false;
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

  getFileUrls(audit: BranchFinancialAudit) {
    if (audit.file_urls) {
      this.fileInfos = this.fileService.getFilesByFileName(audit.file_urls);
    }
    this.filesDialog = true;
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }

  openRemarkModal(audit: CompiledBranchAudit) {
    this.audit_remark = { ...audit };
    this.auditRemarkDialog = true;
  }

  getUnseenRemarks(audit: CompiledBranchAudit) {
    this.unseenRemark.compiledBranchAudit = audit;
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

  getRowDetails(audit: CompiledBranchAudit)
  {
    this.getUnseenRemarks(audit);
    this.computeAssetLiability(audit)
  }
  hideDialog() {
    this.filesDialog = false;
  }

  reviewSelectedFindings() {
    this.compiler.id = this.storageService.getUser().id;
    this.selectedAudits[0].compiler = this.compiler;
    this.confirmationService.confirm({
      message: 'Are you sure you want to Review audits ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.compilerService.reviewFinding(this.selectedAudits).subscribe({
          next: (response) => {
            this.compiledBranchAudits = this.compiledBranchAudits.filter(
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
                  : 'Something went wrong while submitting compiled findings!',
              detail: '',
            });
          },
        });
      },
    });
  }

  reviewFinding(audit: CompiledBranchAudit) {
    this.compiler.id = this.storageService.getUser().id;
    this.compiledBranchAudit = audit;
    this.compiledBranchAudit.compiler = this.compiler;
    this.passAudits.push(this.compiledBranchAudit);
    this.confirmationService.confirm({
      message: 'Are you sure you want to review the given audit ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.compilerService.reviewFinding(this.passAudits).subscribe({
          next: (response) => {
            this.compiledBranchAudits = this.compiledBranchAudits.filter(
              (val) => val.id !== audit.id
            );
            this.compiledBranchAudit = new CompiledBranchAudit();
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
      const worksheet = xlsx.utils.json_to_sheet(this.compiledBranchAudits);
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

  computeAssetLiability(audit: CompiledBranchAudit) {
    this.total_asset_amount = 0;
    this.total_liability_amount = 0;
    this.total_asset_amount_fcy = 0;
    this.total_liability_amount_fcy = 0;

    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.assetLiabilityBranch?.cash_type != 'FCY') {
        if (bfa.assetLiabilityBranch?.asset_amount) {
          this.total_asset_amount += bfa.assetLiabilityBranch?.asset_amount;
        }
        if (bfa.assetLiabilityBranch?.liability_amount) {
          this.total_liability_amount +=
            bfa.assetLiabilityBranch?.liability_amount;
        }
      } else {
        if (bfa.assetLiabilityBranch?.asset_amount) {
          this.total_asset_amount_fcy += bfa.assetLiabilityBranch?.asset_amount;
        }
        if (bfa.assetLiabilityBranch?.liability_amount) {
          this.total_liability_amount_fcy +=
            bfa.assetLiabilityBranch?.liability_amount;
        }
      }
    }
  }

}
