import { Component } from '@angular/core';
import { Branches } from 'app/models/admin/branches';
import { Region } from 'app/models/admin/region';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ExportExcelService } from 'app/services/shared/export-excel.service';
import { StorageService } from 'app/services/shared/storage.service';

import { BranchReportService } from '../../service/branch-report.service';
import { FindingsR } from '../../payloads/findingsR';
import { BranchesR } from '../../payloads/branchesR';
import { NegotiablePayload } from '../../payloads/NegotiableInstrument/negotiable-payload';
import { NegotiableByBranchName } from '../../payloads/NegotiableInstrument/negotiable-by-branch-name';
import { NegotiableByAuditPeriod } from '../../payloads/NegotiableInstrument/negotiable-by-audit-period';
import { NegotiableByRectificationDate } from '../../payloads/NegotiableInstrument/negotiable-by-rectification-date';
import { NegotiableByAuditFinding } from '../../payloads/NegotiableInstrument/negotiable-by-audit-finding';
import { NegotiableByDateRange } from '../../payloads/NegotiableInstrument/negotiable-by-date-range';
import { NegotiableByFindingStatus } from '../../payloads/NegotiableInstrument/negotiable-by-finding-status';
import { NegotiableByRegion } from '../../payloads/NegotiableInstrument/negotiable-by-region';
import { NegotiableByGeneral } from '../../payloads/NegotiableInstrument/negotiable-by-general';
import { NegotiableByAmount } from '../../payloads/NegotiableInstrument/negotiable-by-amount';
import { NegotiableStockItem } from 'app/branch_audit/model/negotiable_stock_item/negotiable-stock-item';
import { NegotiableStockItemService } from 'app/branch_audit/negotiable_instrument/service/negotiable-stock-item.service';
import { HttpErrorResponse } from '@angular/common/http';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}
interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-negotiable-instrument',
  templateUrl: './negotiable-instrument.component.html',
  styleUrls: ['./negotiable-instrument.component.css'],
})
export class NegotiableInstrumentComponent {
  maxDate: Date;
  visibled: boolean = false;
  newFinding: string;
  filter_spinner: boolean = false;

  regionOptions: Region[] = [];
  categoryOfDiscrepancyOptions: Branches[] = [];
  auditFindingOptions: FindingsR[] = [];
  auditFindingOption: FindingsR;
  branchOptions: BranchesR[] = [];
  branchHolder: BranchesR[] = [];
  branch_report = new NegotiablePayload();
  searchClicked = false;
  stateOptions: any[];
  finding_status: any[];
  loading: boolean = false;

  negotiableStockItemOption: NegotiableStockItem[] = [];

  selectedTitleForReport: string = 'AFRFMS - Findings Report';

  //Table
  reportResponse!: any[];
  selectedReports!: any[];
  selectedColumns_branch_audit_report!: Column[];
  cols!: Column[];
  metaKeySelection: boolean = false;
  //export
  exportColumns!: ExportColumn[];
  // exportDataColumns!: any;
  selectedReportType!: string;
  minValueForMax: any = 0;
  bankingOptions: any[];
  cashTypeOptions: any[];

  constructor(
    private branch_report_service: BranchReportService,
    public storageService: StorageService,
    private messageService: MessageService,
    private exportService: ExportExcelService,
    private negotiableStockItemService: NegotiableStockItemService
  ) {}

  ngOnInit(): void {
    this.maxDate = new Date();
    this.getBranch();
    this.getRegion();
    this.getDiscrepancies();
    this.getFindings();
    this.bankingOptions = [
      { label: 'Conventional', value: 'conventional' },
      { label: 'IFB', value: 'ifb' },
    ];
    this.stateOptions = [
      { label: 'Rectified', value: 1 },
      // { label: 'Partially', value: 2 },
      { label: 'Unrectified', value: 3 },
    ];
    this.finding_status = [
      { name: 'Approved', code: 'approved' },
      { name: 'Reviewed', code: 'reviewed' },
      { name: 'Responded', code: 'responded' },
    ];
    this.auditFindingOption = {
      id: '',
      content: '',
    };
    this.cashTypeOptions = [
      { label: 'FCY', value: 1 },
      { label: 'LCY', value: 2 },
    ];
    this.getNegotiableStockItem();
  }

  newFindingDialog() {
    this.visibled = true;
  }

  newFindingSubmit() {
    this.visibled = false;

    if (this.newFinding != undefined && this.newFinding != '') {
      this.auditFindingOption.content = this.newFinding;
      this.auditFindingOption.id = this.newFinding;
      this.auditFindingOptions.push(this.auditFindingOption);
      this.branch_report.audit_finding = this.newFinding;
      this.newFinding = '';
      this.auditFindingOption = new FindingsR();
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'No Finding To Add',
        detail:
          'Please note that the input is empty, indicating that no finding has been added.',
        life: 3000,
      });
    }
  }

  getNegotiableStockItem() {
    let category_ype = 'branch_audit';

    this.negotiableStockItemService
      .getNegotiableStockItemByCatagory(category_ype)
      .subscribe(
        (response) => {
          console.log('response: ' + JSON.stringify(response, null, 4));
          this.negotiableStockItemOption = response;
        },
        (error) => (error: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary:
              error.status == 401
                ? 'You are not permitted to perform this action!'
                : 'Something went wrong while fetching Stock Item Options!',
            detail: '',
          });
        }
      );
  }

  filterBranchByRegion(id: any) {
    this.branchOptions = [];

    this.branchHolder.forEach((branch) => {
      if (branch.region_id == id) {
        this.branchOptions.push(branch);
      }
    });
  }

  onRegionCleared() {
    this.branchOptions = this.branchHolder;
  }

  getFindings() {
    this.branch_report_service.getFindings('NegotiableInstrument').subscribe({
      next: (data) => {
        this.auditFindingOptions = data;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong while fetching findings!',
          life: 3000,
        });
      },
    });
  }

  getDiscrepancies() {
    this.branch_report_service.getDiscrepancies().subscribe({
      next: (data) => {
        this.categoryOfDiscrepancyOptions = data;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong while fetching discrepancies!',
          life: 3000,
        });
      },
    });
  }

  getBranch() {
    this.branch_report_service.getBranches().subscribe({
      next: (data) => {
        this.branchOptions = data;
        this.branchHolder = data;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong while fetching branches!',
          life: 3000,
        });
      },
    });
  }

  getRegion() {
    this.branch_report_service.getRegions().subscribe({
      next: (data) => {
        this.regionOptions = data;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong while fetching regions!',
          life: 3000,
        });
      },
    });
  }

  exportPdf() {
    let pdf_allowed_columns = [
      // 'case_number',
      'branch_name',
      'audit_finding',
      // 'auditor_name',
      'audit_impact',
      'auditor_recommendation',
      'auditee_response',
      // 'audit_finding_status',
      'account_number',
      // 'account_holder_name',
      // 'date_printed',
      'type_of_ck',
      // 'ck_range',
      'quantity',
      // 'unit_price',
      'amount',
      'trial_balance_amount',
      // 'difference',
      // 'audit_report_date',
      'rectified_on',
      'cash_type',
    ];

    this.exportService.exportPdf(
      this.exportColumns.filter((pair) =>
        pdf_allowed_columns.includes(pair.dataKey)
      ),
      this.reportResponse,
      this.selectedTitleForReport,
      this.selectedTitleForReport
    );
  }

  exportDataColumns_ReportByBranchName: NegotiableByBranchName[] = [];
  exportDataColumns_ReportByAuditPeriod: NegotiableByAuditPeriod[] = [];
  exportDataColumns_ReportByRegion: NegotiableByRegion[] = [];
  exportDataColumns_ReportByFindingStatus: NegotiableByFindingStatus[] = [];
  exportDataColumns_ReportByRectificationDate: NegotiableByRectificationDate[] =
    [];
  exportDataColumns_ReportByAuditFinding: NegotiableByAuditFinding[] = [];
  exportDataColumns_ReportByDateRange: NegotiableByDateRange[] = [];
  exportDataColumns_ReportByGeneral: NegotiableByGeneral[] = [];
  exportDataColumns_ReportByAmount: NegotiableByAmount[] = [];

  exportExcel() {
    this.exportDataColumns_ReportByBranchName = [];
    this.exportDataColumns_ReportByAuditPeriod = [];
    this.exportDataColumns_ReportByRegion = [];
    this.exportDataColumns_ReportByFindingStatus = [];
    this.exportDataColumns_ReportByRectificationDate = [];
    this.exportDataColumns_ReportByAuditFinding = [];
    this.exportDataColumns_ReportByDateRange = [];
    this.exportDataColumns_ReportByAmount = [];
    this.exportDataColumns_ReportByGeneral = [];

    let ReportByRegion_: NegotiableByRegion = {
      id: undefined,
      region_name: undefined,
      audit_finding: undefined,

      amount: undefined,
      quantity: undefined,
      unit_price: undefined,
      trial_balance_amount: undefined,
      difference: undefined,
      stock_type: undefined,

      

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByBranchName_: NegotiableByBranchName = {
      id: undefined,
      case_number: undefined,
      branch_name: undefined,
      audit_finding: undefined,

      amount: undefined,
      quantity: undefined,
      unit_price: undefined,
      trial_balance_amount: undefined,
      difference: undefined,
      stock_type: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByAuditPeriod_: NegotiableByAuditPeriod = {
      id: undefined,
      case_number: undefined,
      audit_period: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      amount: undefined,
      unit_price: undefined,
      quantity: undefined,
      trial_balance_amount: undefined,
      difference: undefined,
      stock_type: undefined,
      // account_number: undefined,
      // account_holder_nmae: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByFindingStatus_: NegotiableByFindingStatus = {
      id: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      amount: undefined,
      unit_price: undefined,
      quantity: undefined,
      trial_balance_amount: undefined,
      difference: undefined,
      stock_type: undefined,
      // account_number: undefined,
      // account_holder_nmae: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByRectificationDate_: NegotiableByRectificationDate = {
      id: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      amount: undefined,
      unit_price: undefined,
      quantity: undefined,
      trial_balance_amount: undefined,
      difference: undefined,
      stock_type: undefined,
      // account_number: undefined,
      // account_holder_name: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByAuditFinding_: NegotiableByAuditFinding = {
      branch_name: undefined,
      audit_finding: undefined,

      amount: undefined,
      unit_price: undefined,
      quantity: undefined,
      trial_balance_amount: undefined,
      difference: undefined,
      stock_type: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByDateRange_: NegotiableByDateRange = {
      id: undefined,
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      amount: undefined,
      unit_price: undefined,
      quantity: undefined,
      trial_balance_amount: undefined,
      difference: undefined,
      stock_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByAmount_: NegotiableByAmount = {
      id: undefined,
      branch_name: undefined,
      audit_report_date: undefined,
      audit_finding: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      amount: undefined,
      unit_price: undefined,
      quantity: undefined,
      trial_balance_amount: undefined,
      difference: undefined,
      stock_type: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByGeneral_: NegotiableByGeneral = {
      id: undefined,
      case_number: undefined,
      branch_name: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      audit_report_date: undefined,
      audit_finding: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,

      date_printed: undefined,
      type_of_ck: undefined,
      ck_range: undefined,

      amount: undefined,
      unit_price: undefined,
      quantity: undefined,
      trial_balance_amount: undefined,
      difference: undefined,
      stock_type: undefined,
      account_number: undefined,
      account_holder_name: undefined,

      auditee_response: undefined,
      cash_type: undefined,
    };

    if (this.selectedReportType == 'branch') {
      this.exportReport_excel(
        'branch',
        ReportByBranchName_,
        this.exportDataColumns_ReportByBranchName,
        'Findings Report',
        'AFRFMS - Negotiable Instrument Report by branch name'
      );
    } else if (this.selectedReportType == 'audit_period') {
      this.exportReport_excel(
        'audit_period',
        ReportByAuditPeriod_,
        this.exportDataColumns_ReportByAuditPeriod,
        'Findings Report',
        'AFRFMS -  Negotiable Instrument Report by audit period'
      );
    } else if (this.selectedReportType == 'region') {
      this.exportReport_excel(
        'region',
        ReportByRegion_,
        this.exportDataColumns_ReportByRegion,
        'Findings Report',
        'AFRFMS -  Negotiable Instrument Report by region'
      );
    } else if (this.selectedReportType == 'finding_status') {
      this.exportReport_excel(
        'finding_status',
        ReportByFindingStatus_,
        this.exportDataColumns_ReportByFindingStatus,
        'Findings Report',
        'AFRFMS -  Negotiable Instrument Report by finding status'
      );
    } else if (this.selectedReportType == 'rectification_date_range') {
      this.exportReport_excel(
        'rectification_date_range',
        ReportByRectificationDate_,
        this.exportDataColumns_ReportByRectificationDate,
        'Findings Report',
        'AFRFMS -  Negotiable Instrument Report by rectification date range'
      );
    } else if (this.selectedReportType == 'audit_finding') {
      this.exportReport_excel(
        'audit_finding',
        ReportByAuditFinding_,
        this.exportDataColumns_ReportByAuditFinding,
        'Findings Report',
        'AFRFMS -  Negotiable Instrument Report by rectification audit finding'
      );
    }
    // else if (this.selectedReportType == 'audit_finding') {
    //   this.exportReport_excel(
    //     'audit_finding',
    //     ReportByAuditFinding_,
    //     this.exportDataColumns_ReportByAuditFinding,
    //     'Findings Report',
    //     'AFRFMS - Findings Report'
    //   );
    // }
    else if (this.selectedReportType == 'date_range') {
      this.exportReport_excel(
        'date_range',
        ReportByDateRange_,
        this.exportDataColumns_ReportByDateRange,
        'Findings Report',
        'AFRFMS -  Negotiable Instrument Report by date range'
      );
    } else if (this.selectedReportType == 'amount') {
      this.exportReport_excel(
        'date_range',
        ReportByAmount_,
        this.exportDataColumns_ReportByAmount,
        'Findings Report',
        'AFRFMS -  Negotiable Instrument Report by amount'
      );
    } else {
      this.exportReport_excel(
        'general',
        ReportByGeneral_,
        this.exportDataColumns_ReportByGeneral,
        'Findings Report',
        'AFRFMS -  Negotiable Instrument Report'
      );
    }
  }

  exportReport_excel(
    reportType: string,
    reportClass: any,
    exportData: any[],
    sheet_name: string,
    title: string
  ) {
    this.reportResponse.forEach((_item) => {
      Object.keys(_item).forEach((key) => {
        if (reportClass.hasOwnProperty(key)) reportClass[key] = _item[key];
      });
      exportData.push(reportClass);
      reportClass = this.clearData(reportClass);
    });
    let reportData = {
      sheet_name: sheet_name,
      title: title,
      data: exportData,
      headers: this.exportColumns,
    };

    this.exportService.exportExcel(reportData);
  }

  clear(table: Table) {
    table.clear();
  }

  clearData(a: any) {
    return {
      ...Object.keys(a).reduce(
        (acc, key) => ({ ...acc, [key]: undefined }),
        {}
      ),
    };
  }

  updateMaxValue() {
    if (this.branch_report.min_amount != undefined)
      this.minValueForMax = this.branch_report.min_amount;
  }

  clearDataReset() {
    this.minValueForMax = 0;
    this.branch_report = {
      ...Object.keys(this.branch_report).reduce(
        (acc, key) => ({ ...acc, [key]: undefined }),
        {}
      ),
    };
    this.onRegionCleared();
  }

  submitReportRequest(): void {
    this.filter_spinner = true;
    {
      this.branch_report.cash_type = this.branch_report.cash_type
        ? this.cashTypeOptions.find(
            (kdb) => kdb.value === this.branch_report.cash_type
          )?.label
        : undefined;
    }

    {
      this.branch_report.regional_compiler_compiled_date == null
        ? (this.branch_report.regional_compiler_compiled_date = ['', ''])
        : undefined;
    }
    {
      this.branch_report.division_compiler_compiled_date == null
        ? (this.branch_report.division_compiler_compiled_date = ['', ''])
        : undefined;
    }
    {
      this.branch_report.approved_date == null
        ? (this.branch_report.approved_date = ['', ''])
        : undefined;
    }

    {
      this.branch_report.rectification_date_range == null
        ? (this.branch_report.rectification_date_range = ['', ''])
        : undefined;
    }
    {
      this.branch_report.date_range == null
        ? (this.branch_report.date_range = ['', ''])
        : undefined;
    }

    {
      this.branch_report.rectification_status = this.branch_report
        .rectification_status
        ? this.stateOptions.find(
            (region) => region.value === this.branch_report.rectification_status
          )?.label
        : undefined;
    }

    let undefinedProperties = [];
    {
      if (
        this.branch_report.audit_finding !== undefined &&
        this.branch_report.audit_finding !== null
      )
        undefinedProperties.push('audit_finding');
      if (
        this.branch_report.branch !== undefined &&
        this.branch_report.branch !== null
      )
        undefinedProperties.push('branch');
      if (
        (this.branch_report.min_amount !== undefined &&
          this.branch_report.min_amount !== null) ||
        (this.branch_report.max_amount !== undefined &&
          this.branch_report.max_amount !== null)
      )
        undefinedProperties.push('amount');
      if (
        this.branch_report.account_number !== undefined &&
        this.branch_report.account_number !== null
      )
        undefinedProperties.push('account_number');

      if (
        this.branch_report.date_range[0] != '' ||
        this.branch_report.date_range[1] != ''
      )
        undefinedProperties.push('date_range');
      if (
        this.branch_report.finding_status !== undefined &&
        this.branch_report.finding_status !== null
      )
        undefinedProperties.push('finding_status');
      if (
        this.branch_report.rectification_date_range[0] != '' ||
        this.branch_report.rectification_date_range[1] != ''
      )
        undefinedProperties.push('rectification_date_range');
      if (
        this.branch_report.rectification_status !== undefined &&
        this.branch_report.rectification_status != ''
      )
        undefinedProperties.push('rectification_status');
      if (
        this.branch_report.region !== undefined &&
        this.branch_report.region !== null
      )
        undefinedProperties.push('region');
    }

    if (undefinedProperties.length === 1) {
      this.branch_report.single_filter_info = undefinedProperties[0];
    } else {
      this.branch_report.single_filter_info = 'general';
    }

    this.branch_report_service
      .fetchReportNegotiable(this.branch_report)
      .subscribe(
        (data: any) => {
          this.reportResponse = data;
          this.filter_spinner = false;
          this.searchClicked = true;
          this.calculate_totals(data);
        },
        (error: any) => {}
      );

    if (this.branch_report.single_filter_info == 'branch') {
      this.cols = NegotiableByBranchName.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Negotiable Instrument Report by branch';
    } else if (this.branch_report.single_filter_info == 'region') {
      this.cols = NegotiableByRegion.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Negotiable Instrument Report by region';
    } else if (this.branch_report.single_filter_info == 'finding_status') {
      this.cols = NegotiableByFindingStatus.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));

      this.selectedTitleForReport =
        'AFRFMS - Negotiable Instrument Report by finding status';
    } else if (
      this.branch_report.single_filter_info == 'rectification_date_range'
    ) {
      this.cols = NegotiableByRectificationDate.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));

      this.selectedTitleForReport =
        'AFRFMS - Negotiable Instrument Report by rectification date range';
    } else if (this.branch_report.single_filter_info == 'audit_finding') {
      this.cols = NegotiableByAuditFinding.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));

      this.selectedTitleForReport =
        'AFRFMS - Negotiable Instrument Report by audit finding';
    } else if (this.branch_report.single_filter_info == 'date_range') {
      this.cols = NegotiableByDateRange.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));

      this.selectedTitleForReport =
        'AFRFMS - Negotiable Instrument Report by date range';
    } else if (this.branch_report.single_filter_info == 'amount') {
      this.cols = NegotiableByAmount.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Negotiable Instrument Report by amount';
    } else {
      this.cols = NegotiableByGeneral.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport = 'AFRFMS - Negotiable Instrument Report';
    }

    {
      this.selectedReportType = this.branch_report.single_filter_info;
      const a = this.branch_report;
      this.branch_report = this.clearData(this.branch_report);
      a.single_filter_info = undefined;
      this.branch_report = a;
      if (
        this.branch_report.date_range != undefined &&
        this.branch_report.date_range[0] == '' &&
        this.branch_report.date_range[1] == ''
      )
        this.branch_report.date_range = undefined;

      if (
        this.branch_report.rectification_date_range != undefined &&
        this.branch_report.rectification_date_range[0] == '' &&
        this.branch_report.rectification_date_range[1] == ''
      )
        this.branch_report.rectification_date_range = undefined;

        if (
          this.branch_report.regional_compiler_compiled_date != undefined &&
          this.branch_report.regional_compiler_compiled_date[0] == '' &&
          this.branch_report.regional_compiler_compiled_date[1] == ''
        )
          this.branch_report.regional_compiler_compiled_date = undefined;

        if (
          this.branch_report.division_compiler_compiled_date != undefined &&
          this.branch_report.division_compiler_compiled_date[0] == '' &&
          this.branch_report.division_compiler_compiled_date[1] == ''
        )
          this.branch_report.division_compiler_compiled_date = undefined;

        if (
          this.branch_report.approved_date != undefined &&
          this.branch_report.approved_date[0] == '' &&
          this.branch_report.approved_date[1] == ''
        )
          this.branch_report.approved_date = undefined;
    }
  }

  tot_unit_price: number = 0;
  tot_amount: number = 0;
  tot_trial_balance_amount: number = 0;
  tot_difference: number = 0;

  calculate_totals(data: any) {
    this.tot_unit_price = data.reduce(
      (sum: number, obj: any) => sum + ((Number) (obj.unit_price)),
      0
    );
    this.tot_amount = data.reduce(
      (sum: number, obj: any) => sum + ((Number)(obj.amount)),
      0
    );
    this.tot_trial_balance_amount = data.reduce(
      (sum: number, obj: any) => sum + ((Number)(obj.trial_balance_amount)),
      0
    );
    this.tot_difference = data.reduce(
      (sum: number, obj: any) => sum + ((Number)(obj.difference)),
      0
    );
  }
}
