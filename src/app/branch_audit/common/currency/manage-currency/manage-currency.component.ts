import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { StorageService } from 'app/services/shared/storage.service';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Currency } from '../currency';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-manage-currency',
  templateUrl: './manage-currency.component.html',
  styleUrls: ['./manage-currency.component.css'],
})
export class ManageCurrencyComponent {
  cols: any[];

  exportColumns: any[];

  currency: Currency[] = [];

  selectedCurrency: Currency[] = [];


  loading = true;

  constructor(
    private messageService: MessageService,
    private currencyService: CurrencyService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    this.cols = [
      { field: 'currency_type', header: 'Currency Type' },
      { field: 'equivalent_birr', header: 'Equivalent Birr' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
    this.getCurrency();
  }

  getCurrency() {
    this.currencyService.getCurrency().subscribe({
      next: (data) => {
        this.currency = data;
        this.loading = false;
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
        this.loading = false;
      },
    });
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
      const worksheet = xlsx.utils.json_to_sheet(this.currency);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'Recent Activity');
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
