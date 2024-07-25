import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { CompiledBranchAudit } from 'app/branch_audit/model/compiled-branch-audit';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DivisionCompilerService } from '../../services/division-compiler.service';
@Component({
  selector: 'app-compiled-incomplete-document-reviewed-division',
  templateUrl:
    './compiled-incomplete-document-reviewed-division.component.html',
  styleUrls: ['./compiled-incomplete-document-reviewed-division.component.css'],
})
export class CompiledIncompleteDocumentReviewedDivisionComponent {
  compiledBranchAudits: CompiledBranchAudit[] = [];
  compiledBranchAudit = new CompiledBranchAudit();
  selectedAudits: CompiledBranchAudit[] = [];
  passAudits: CompiledBranchAudit[] = [];
  compiler = new User();

  category = '';
  loading = true;

  fileInfos: Observable<any>;
  filesDialog = false;

  parameters: any[] = [];

  outputData: any[] = [];
  compile_ui = false;

   //incomplete account
   total_amount_withdraw_fcy = 0;
   total_amount_withdraw_lcy = 0;

  constructor(
    private compilerService: DivisionCompilerService,
    private storageService: StorageService,
    private fileService: BranchFinancialAuditService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    let user = this.storageService.getUser();
    this.category = this.storageService.getUser().category;
    this.parameters.push(user.id);
    this.parameters.push("IncompleteAccount");

    this.compilerService.getReviewedFindings(this.parameters).subscribe(
      (response) => {
        this.compiledBranchAudits = response;
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

  computeIncompleteAccount(audit: CompiledBranchAudit) {
    this.total_amount_withdraw_lcy = 0;
    this.total_amount_withdraw_fcy = 0;
    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.incompleteAccountBranch?.account_type != 'FCY') {
        if (bfa.incompleteAccountBranch?.account_opened_amount) {
          this.total_amount_withdraw_lcy +=
            bfa.incompleteAccountBranch?.account_opened_amount;
        }
      } else {
        if (bfa.incompleteAccountBranch?.account_opened_amount) {
          this.total_amount_withdraw_fcy +=
            bfa.incompleteAccountBranch?.account_opened_amount;
        }
      }
    }
  }

  getRowDetails(audit: CompiledBranchAudit) {
    this.computeIncompleteAccount(audit);
  }

  hideDialog() {
    this.filesDialog = false;
  }

  unreviewSelectedFindings() {
    this.compiler.id = this.storageService.getUser().id;
    this.selectedAudits[0].compiler = this.compiler;
    this.confirmationService.confirm({
      message: 'Are you sure you want to Unreview audits ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.compilerService
          .unreviewFinding(this.selectedAudits)
          .subscribe({
            next: (response) => {
              this.compiledBranchAudits = this.compiledBranchAudits.filter(
                (val) => !this.selectedAudits.includes(val)
              );
              this.selectedAudits = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audits Unreviewed',
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
                    : 'Something went wrong while unreviewing selected findings!',
                detail: '',
              });
            },
          });
      },
    });
  }

  unreviewFinding(audit: CompiledBranchAudit) {
    this.compiler.id = this.storageService.getUser().id;
    this.compiledBranchAudit = audit;
    this.compiledBranchAudit.compiler = this.compiler;
    this.passAudits.push(this.compiledBranchAudit);
    this.confirmationService.confirm({
      message: 'Are you sure you want to unreview the given audit ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.compilerService.unreviewFinding(this.passAudits).subscribe({
          next: (response) => {
            this.compiledBranchAudits = this.compiledBranchAudits.filter(
              (val) => val.id !== audit.id
            );
            this.compiledBranchAudit = new CompiledBranchAudit();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Audit Unreviewed',
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
                  : 'Something went wrong while unreviewing finding!',
              detail: '',
            });
          },
        });
      },
    });
  }

  onDataInput(data: CompiledBranchAudit[]) {
    if(data)
    {
      this.compile_ui = false;
      this.compiledBranchAudits = this.compiledBranchAudits.filter(
        (val) => !data.includes(val)
      );
    }
  }

  compileAudits() {
    this.outputData.push(this.selectedAudits);
    this.outputData.push('IncompleteAccount');
    this.compile_ui = true;
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
}
