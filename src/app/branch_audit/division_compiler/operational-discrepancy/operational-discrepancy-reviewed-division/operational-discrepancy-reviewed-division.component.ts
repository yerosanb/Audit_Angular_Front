import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Currency } from 'app/branch_audit/common/currency/currency';
import { CurrencyService } from 'app/branch_audit/common/currency/currency.service';
import { DataPoolingServiceBranchService } from 'app/branch_audit/common/service/data-pooling-service-branch.service';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { CompiledBranchAudit } from 'app/branch_audit/model/compiled-branch-audit';
import { OperationalDescripancyPooledData } from 'app/branch_audit/operational-descripancy/data-pooling-branch/operational-descripancy-pooled-data';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { DivisionCompilerService } from '../../services/division-compiler.service';
@Component({
  selector: 'app-operational-discrepancy-reviewed-division',
  templateUrl: './operational-discrepancy-reviewed-division.component.html',
  styleUrls: ['./operational-discrepancy-reviewed-division.component.css'],
})
export class OperationalDiscrepancyReviewedDivisionComponent {
  compiledBranchAudits: CompiledBranchAudit[] = [];
  compiledBranchAudit = new CompiledBranchAudit();
  selectedAudits: CompiledBranchAudit[] = [];
  filteredAudits: BranchFinancialAudit[] = [];
  passAudits: CompiledBranchAudit[] = [];
  compiler = new User();
  category = '';
  loading = true;
  fileInfos: Observable<any>;
  filesDialog = false;
  parameters: any[] = [];
  outputData: any[] = [];
  compile_ui = false;
  poolData = new OperationalDescripancyPooledData();
  poolDialog = false;
  cash_type_valid: boolean = false;
  currency: Currency[] = [];
  is_fcy = false;

   //Operation Discrepancies
   total_amount_fcy = 0;
   total_amount_lcy = 0;

  constructor(
    private compilerService: DivisionCompilerService,
    private storageService: StorageService,
    private fileService: BranchFinancialAuditService,
    private messageService: MessageService,
    private poolingService: DataPoolingServiceBranchService,
    private currencyService: CurrencyService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    let user = this.storageService.getUser();
    this.category = this.storageService.getUser().category;

    this.parameters.push(user.id);
    this.parameters.push('OperationalDiscrepancy');

    this.compilerService.getReviewedFindings(this.parameters).subscribe(
      (response) => {
        this.compiledBranchAudits = response;
        this.loading = false;
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
    console.log(this.is_fcy);

    this.filteredAudits = [];

    this.selectedAudits.forEach((compiledBFAudit) => {
      let bfAudits = compiledBFAudit.branchFinancialAudits;
      bfAudits.forEach((bfAudit) => {
        let operationalDescripancy = bfAudit.operationalDescripancyBranch;
        if (operationalDescripancy && this.poolData) {
          if (operationalDescripancy.amount && this.poolData.pool_amount) {
            if (this.is_fcy) {
              if (
                operationalDescripancy.cash_type === this.poolData.cash_type &&
                operationalDescripancy.amount <= this.poolData.pool_amount &&
                operationalDescripancy.fcy === this.poolData.fcy
              ) {
                this.filteredAudits.push(bfAudit);
              }
            } else {
              if (
                operationalDescripancy.cash_type === this.poolData.cash_type &&
                operationalDescripancy.amount <= this.poolData.pool_amount
              ) {
                this.filteredAudits.push(bfAudit);
              }
            }
          }
        }
      });
    });

    // Now filteredBFAudits contains the BFAudits that meet your criteria

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
            // this.audits = this.audits.filter(
            //   (val) => !this.filteredAudits.includes(val)
            // );
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

  getFileUrls(audit: BranchFinancialAudit) {
    if (audit.file_urls) {
      this.fileInfos = this.fileService.getFilesByFileName(audit.file_urls);
    }
    this.filesDialog = true;
  }

  getRowDetails(audit: CompiledBranchAudit) {
    this.getRowDetails(audit);
  }

  computeOperationalDiscrepancy(audit: CompiledBranchAudit) {
    this.total_amount_lcy = 0;
    this.total_amount_fcy = 0;
    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.operationalDescripancyBranch?.cash_type != 'FCY') {
        if (bfa.operationalDescripancyBranch?.amount) {
          this.total_amount_lcy += bfa.operationalDescripancyBranch?.amount;
        }
      } else {
        if (bfa.operationalDescripancyBranch?.amount) {
          this.total_amount_fcy += bfa.operationalDescripancyBranch?.amount;
        }
      }
    }
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
        this.compilerService.unreviewFinding(this.selectedAudits).subscribe({
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
    if (data) {
      this.compile_ui = false;
      this.compiledBranchAudits = this.compiledBranchAudits.filter(
        (val) => !data.includes(val)
      );
    }
  }

  compileAudits() {
    this.outputData.push(this.selectedAudits);
    this.outputData.push('OperationalDiscrepancy');
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
