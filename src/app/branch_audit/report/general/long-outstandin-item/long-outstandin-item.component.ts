import { Component, OnInit } from '@angular/core';
import { Branches } from 'app/models/admin/branches';

import { Region } from 'app/models/admin/region';
import { Table } from 'primeng/table';

import { MessageService } from 'primeng/api';
import { ExportExcelService } from 'app/services/shared/export-excel.service';

import { StorageService } from 'app/services/shared/storage.service';

import { BranchReportService } from '../../service/branch-report.service';
import { FindingsR } from '../../payloads/findingsR';
import { BranchesR } from '../../payloads/branchesR';

import { LongPayload } from '../../payloads/LongOutstanding/long-payload';
import { LongByBranchName } from '../../payloads/LongOutstanding/long-by-branch-name';
import { LongByAuditPeriod } from '../../payloads/LongOutstanding/long-by-audit-period';
import { LongByRectificationDate } from '../../payloads/LongOutstanding/long-by-rectification-date';
import { LongByFindingStatus } from '../../payloads/LongOutstanding/long-by-finding-status';
import { LongByAuditFinding } from '../../payloads/LongOutstanding/long-by-audit-finding';
import { LongByDateRange } from '../../payloads/LongOutstanding/long-by-date-range';
import { LongByGeneral } from '../../payloads/LongOutstanding/long-by-general';
import { LongByRegion } from '../../payloads/LongOutstanding/long-by-region';
import { LongByAmount } from '../../payloads/LongOutstanding/long-by-amount';
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}
interface ExportColumn {
  title: string;
  dataKey: string;
}

// interface Number {
//   range: string;

// }

// interface Amount {
//   range: string;

// }

interface CashType {
  type: string;
}

@Component({
  selector: 'app-long-outstandin-item',
  templateUrl: './long-outstandin-item.component.html',
  styleUrls: ['./long-outstandin-item.component.css'],
})
export class LongOutstandinItemComponent {
  maxDate: Date;
  visibled: boolean = false;
  newFinding: string;
  filter_spinner: boolean = false;
  selectedTitleForReport: string = 'AFRFMS - Findings Report';

  regionOptions: Region[] = [];
  categoryOfDiscrepancyOptions: Branches[] = [];
  auditFindingOptions: FindingsR[] = [];
  auditFindingOption: FindingsR;
  branchOptions: BranchesR[] = [];
  branchHolder: BranchesR[] = [];
  branch_report = new LongPayload();
  searchClicked = false;
  stateOptions: any[];
  finding_status: any[];
  loading: boolean = false;

  // number: Number[] | undefined;
  // amount: Amount[] | undefined;
  cashtype: CashType[] | undefined;
  cashTypeOptions: any[];
  itemAgeOptions: any[];

  items: any[];

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
  minValueForMax2: any = 0;
  minValueForMax3: any = 0;
  minValueForMax4: any = 0;
  bankingOptions: any[];
  constructor(
    private branch_report_service: BranchReportService,
    public storageService: StorageService,
    private messageService: MessageService,
    private exportService: ExportExcelService
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
    this.items = [
      { item: 'UN Cleared Effect', value: 'UN Cleared Effect' },
      { item: 'S/Dr-Debtor', value: 'S/Dr-Debtor' },
      { item: 'S/Cr-Creditor', value: 'S/Cr-Creditor' },
      { item: 'Other', value: 'Other' },
    ];

    this.stateOptions = [
      { label: 'Rectified', value: 1 },
      // { label: 'Partially', value: 2 },
      { label: 'Unrectified', value: 3 },
    ];

    // this.number = [
    //   { range: 'less than 90' },
    //   { range: 'greater than 90' },
    //   { range: 'greater than 180' },
    //   { range: 'greater than 365' },

    // ];

    this.cashtype = [
      { type: 'Local Currency' },
      { type: 'Foreign Currency' },
      { type: 'Petty Cash' },
      { type: 'ATM Cash' },
      { type: 'Other' },
    ];

    this.cashTypeOptions = [
      { label: 'FCY', value: 1 },
      { label: 'LCY', value: 2 },
    ];

    this.itemAgeOptions = [
      { name: '< 90', value: 'less_than_90' },
      { name: '90 to 180', value: 'between_90_180' },
      { name: '180 to 365', value: 'between_180_365' },
      { name: '> 365', value: 'greater_than_365' },
    ];

    // this.amount = [
    //   { range: 'less than 90' },
    //   { range: 'greater than 90' },
    //   { range: 'greater than 180' },
    //   { range: 'greater than 365' },

    // ];
    this.finding_status = [
      { name: 'Approved', code: 'approved' },
      { name: 'Reviewed', code: 'reviewed' },
      { name: 'Responded', code: 'responded' },
    ];
    this.auditFindingOption = {
      id: '',
      content: '',
    };
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
    this.branch_report_service.getFindings('LongOutstandingItem').subscribe({
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
      // 'audit_impact',
      // 'auditor_recommendation',
      'auditee_response',
      // 'audit_finding_status',
      'less_than_90_amount',
      'greater_than_90_amount',
      'greater_than_180_amount',
      'greater_than_365_amount',
      'less_than_90_number',
      'greater_than_90_number',
      'greater_than_180_number',
      'greater_than_365_number',
      'trial_balance',
      'total_amount',
      // 'difference',
      'cash_type',
      'outstanding_item',
      // 'justification',
      // 'fcy',
      'audit_report_date',
      // 'rectified_on',
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

  exportDataColumns_ReportByBranchName: LongByBranchName[] = [];
  exportDataColumns_ReportByAuditPeriod: LongByAuditPeriod[] = [];
  exportDataColumns_ReportByRegion: LongByRegion[] = [];
  exportDataColumns_ReportByFindingStatus: LongByFindingStatus[] = [];
  exportDataColumns_ReportByRectificationDate: LongByRectificationDate[] = [];
  exportDataColumns_ReportByAuditFinding: LongByAuditFinding[] = [];
  exportDataColumns_ReportByDateRange: LongByDateRange[] = [];
  exportDataColumns_ReportByGeneral: LongByGeneral[] = [];
  exportDataColumns_ReportByAmount: LongByAmount[] = [];

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

    let ReportByRegion_: LongByRegion = {
      region_name: undefined,
      audit_finding: undefined,

      less_than_90_amount: undefined,
      greater_than_90_amount: undefined,
      greater_than_180_amount: undefined,
      greater_than_365_amount: undefined,


      less_than_90_number: undefined,
      greater_than_90_number: undefined,
      greater_than_180_number: undefined,
      greater_than_365_number: undefined,

      trial_balance: undefined,
      total_balance: undefined,
      difference: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByBranchName_: LongByBranchName = {
      case_number: undefined,
      branch_name: undefined,
      audit_finding: undefined,

      less_than_90_amount: undefined,
      greater_than_90_amount: undefined,
      greater_than_180_amount: undefined,
      greater_than_365_amount: undefined,


      less_than_90_number: undefined,
      greater_than_90_number: undefined,
      greater_than_180_number: undefined,
      greater_than_365_number: undefined,

      trial_balance: undefined,
      total_balance: undefined,
      difference: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByAuditPeriod_: LongByAuditPeriod = {
      case_number: undefined,
      audit_period: undefined,
      branch_name: undefined,
      audit_finding: undefined,

      less_than_90_amount: undefined,
      greater_than_90_amount: undefined,
      greater_than_180_amount: undefined,
      greater_than_365_amount: undefined,

      less_than_90_number: undefined,
      greater_than_90_number: undefined,
      greater_than_180_number: undefined,
      greater_than_365_number: undefined,

      trial_balance: undefined,
      total_balance: undefined,
      difference: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByFindingStatus_: LongByFindingStatus = {
      branch_name: undefined,
      audit_finding: undefined,

      less_than_90_amount: undefined,
      greater_than_90_amount: undefined,
      greater_than_180_amount: undefined,
      greater_than_365_amount: undefined,


      less_than_90_number: undefined,
      greater_than_90_number: undefined,
      greater_than_180_number: undefined,
      greater_than_365_number: undefined,

      trial_balance: undefined,
      total_balance: undefined,
      difference: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByRectificationDate_: LongByRectificationDate = {
      branch_name: undefined,
      audit_finding: undefined,
      less_than_90_amount: undefined,
      greater_than_90_amount: undefined,
      greater_than_180_amount: undefined,
      greater_than_365_amount: undefined,


      less_than_90_number: undefined,
      greater_than_90_number: undefined,
      greater_than_180_number: undefined,
      greater_than_365_number: undefined,

      trial_balance: undefined,
      total_balance: undefined,
      difference: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByAuditFinding_: LongByAuditFinding = {
      branch_name: undefined,
      audit_finding: undefined,
      less_than_90_amount: undefined,
      greater_than_90_amount: undefined,
      greater_than_180_amount: undefined,
      greater_than_365_amount: undefined,


      less_than_90_number: undefined,
      greater_than_90_number: undefined,
      greater_than_180_number: undefined,
      greater_than_365_number: undefined,

      trial_balance: undefined,
      total_balance: undefined,
      difference: undefined,
      account_number: undefined,
      account_holder_name: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByDateRange_: LongByDateRange = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      less_than_90_amount: undefined,
      greater_than_90_amount: undefined,
      greater_than_180_amount: undefined,
      greater_than_365_amount: undefined,


      less_than_90_number: undefined,
      greater_than_90_number: undefined,
      greater_than_180_number: undefined,
      greater_than_365_number: undefined,

      trial_balance: undefined,
      total_balance: undefined,
      difference: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByAmount_: LongByAmount = {
      branch_name: undefined,
      audit_report_date: undefined,
      audit_finding: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      less_than_90_amount: undefined,
      greater_than_90_amount: undefined,
      greater_than_180_amount: undefined,
      greater_than_365_amount: undefined,


      less_than_90_number: undefined,
      greater_than_90_number: undefined,
      greater_than_180_number: undefined,
      greater_than_365_number: undefined,

      trial_balance: undefined,
      total_balance: undefined,
      difference: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByGeneral_: LongByGeneral = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,

      less_than_90_amount: undefined,
      greater_than_90_amount: undefined,
      greater_than_180_amount: undefined,
      greater_than_365_amount: undefined,


      less_than_90_number: undefined,
      greater_than_90_number: undefined,
      greater_than_180_number: undefined,
      greater_than_365_number: undefined,

      trial_balance: undefined,
      total_balance: undefined,
      difference: undefined,

      outstanding_item: undefined,
      justification: undefined,
      cash_type: undefined,
      item_number: undefined,
      fcy: undefined,

      account_number: undefined,
      account_holder_name: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    if (this.selectedReportType == 'branch') {
      this.exportReport_excel(
        'branch',
        ReportByBranchName_,
        this.exportDataColumns_ReportByBranchName,
        'Findings Report',
        'AFRFMS - Long Outstanding Item Report by branch name'
      );
    } else if (this.selectedReportType == 'audit_period') {
      this.exportReport_excel(
        'audit_period',
        ReportByAuditPeriod_,
        this.exportDataColumns_ReportByAuditPeriod,
        'Findings Report',
        'AFRFMS - Long Outstanding Item Report by audit period'
      );
    } else if (this.selectedReportType == 'region') {
      this.exportReport_excel(
        'region',
        ReportByRegion_,
        this.exportDataColumns_ReportByRegion,
        'Findings Report',
        'AFRFMS - Long Outstanding Item Report by region'
      );
    } else if (this.selectedReportType == 'finding_status') {
      this.exportReport_excel(
        'finding_status',
        ReportByFindingStatus_,
        this.exportDataColumns_ReportByFindingStatus,
        'Findings Report',
        'AFRFMS - Long Outstanding Item Report by finding status'
      );
    } else if (this.selectedReportType == 'rectification_date_range') {
      this.exportReport_excel(
        'rectification_date_range',
        ReportByRectificationDate_,
        this.exportDataColumns_ReportByRectificationDate,
        'Findings Report',
        'AFRFMS - Long Outstanding Item Report by rectification date range'
      );
    } else if (this.selectedReportType == 'audit_finding') {
      this.exportReport_excel(
        'audit_finding',
        ReportByAuditFinding_,
        this.exportDataColumns_ReportByAuditFinding,
        'Findings Report',
        'AFRFMS - Long Outstanding Item Report by audit finding'
      );
    } else if (this.selectedReportType == 'date_range') {
      this.exportReport_excel(
        'date_range',
        ReportByDateRange_,
        this.exportDataColumns_ReportByDateRange,
        'Findings Report',
        'AFRFMS - Long Outstanding Item Report by date range'
      );
    } else if (this.selectedReportType == 'amount') {
      this.exportReport_excel(
        'amount',
        ReportByAmount_,
        this.exportDataColumns_ReportByAmount,
        'Findings Report',
        'AFRFMS - Long Outstanding Item Report by amount'
      );
    } else {
      this.exportReport_excel(
        'general',
        ReportByGeneral_,
        this.exportDataColumns_ReportByGeneral,
        'Findings Report',
        'AFRFMS - Long Outstanding Item Report'
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

  updateless90MaxValue() {
    if (this.branch_report.less_than_90_amount_min != undefined)
      this.minValueForMax = this.branch_report.less_than_90_amount_min;
  }
  updategreater90MaxValue() {
    if (this.branch_report.greater_than_90_amount_min != undefined)
      this.minValueForMax2 = this.branch_report.greater_than_90_amount_min;
  }

  updategreater180MaxValue() {
    if (this.branch_report.greater_than_180_amount_min != undefined)
      this.minValueForMax3 = this.branch_report.greater_than_180_amount_min;
  }
  updategreater365MaxValue() {
    if (this.branch_report.greater_than_365_amount_min != undefined)
      this.minValueForMax4 = this.branch_report.greater_than_365_amount_min;
  }

  clearData(a: any) {
    return {
      ...Object.keys(a).reduce(
        (acc, key) => ({ ...acc, [key]: undefined }),
        {}
      ),
    };
  }

  clearDataReset() {
    this.minValueForMax = 0;
    this.minValueForMax2 = 0;
    this.minValueForMax3 = 0;
    this.minValueForMax4 = 0;
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
      this.branch_report.rectification_date_range == null
        ? (this.branch_report.rectification_date_range = ['', ''])
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
      this.branch_report.date_range == null
        ? (this.branch_report.date_range = ['', ''])
        : undefined;
    }
    // {
    //   this.branch_report.category_of_discrepancy = this.branch_report
    //     .category_of_discrepancy
    //     ? this.categoryOfDiscrepancyOptions.find(
    //         (region) => region.id === this.branch_report.category_of_discrepancy
    //       )?.name
    //     : undefined;
    // }

    {
      this.branch_report.rectification_status = this.branch_report
        .rectification_status
        ? this.stateOptions.find(
            (region) => region.value === this.branch_report.rectification_status
          )?.label
        : undefined;
    }

    {
      this.branch_report.cash_type = this.branch_report.cash_type
        ? this.cashTypeOptions.find(
            (kdb) => kdb.value === this.branch_report.cash_type
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
        (this.branch_report.less_than_90_amount_min !== undefined &&
          this.branch_report.less_than_90_amount_min !== null) ||
        (this.branch_report.less_than_90_amount_max !== undefined &&
          this.branch_report.less_than_90_amount_max !== null) ||
        (this.branch_report.greater_than_90_amount_min !== undefined &&
          this.branch_report.greater_than_90_amount_min !== null) ||
        (this.branch_report.greater_than_90_amount_max !== undefined &&
          this.branch_report.greater_than_90_amount_max !== null) ||
        (this.branch_report.greater_than_180_amount_min !== undefined &&
          this.branch_report.greater_than_180_amount_min !== null) ||
        (this.branch_report.greater_than_180_amount_max !== undefined &&
          this.branch_report.greater_than_180_amount_max !== null) ||
        (this.branch_report.greater_than_365_amount_min !== undefined &&
          this.branch_report.greater_than_365_amount_min !== null) ||
        (this.branch_report.greater_than_365_amount_max !== undefined &&
          this.branch_report.greater_than_365_amount_max !== null)
      )
        undefinedProperties.push('amount');
      // if (
      //   this.branch_report.account_number !== undefined &&
      //   this.branch_report.account_number !== null
      // )
      //   undefinedProperties.push('account_number');
      // if (
      //   this.branch_report.category_of_discrepancy !== undefined &&
      //   this.branch_report.category_of_discrepancy !== null
      // )
      //   undefinedProperties.push('category_of_discrepancy');
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

    this.branch_report_service.fetchReportLong(this.branch_report).subscribe(
      (data: any) => {
        this.reportResponse = data;
        this.filter_spinner = false;
        this.searchClicked = true;
        this.calculate_totals(data);
      },
      (error: any) => {}
    );

    if (this.branch_report.single_filter_info == 'branch') {
      this.cols = LongByBranchName.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Long Outstanding Item Report by branch';
    } else if (this.branch_report.single_filter_info == 'region') {
      this.cols = LongByRegion.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Long Outstanding Item Report by region';
    } else if (this.branch_report.single_filter_info == 'finding_status') {
      this.cols = LongByFindingStatus.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Long Outstanding Item Report by finding status';
    } else if (
      this.branch_report.single_filter_info == 'rectification_date_range'
    ) {
      this.cols = LongByRectificationDate.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Long Outstanding Item Report by rectification date range';
    } else if (this.branch_report.single_filter_info == 'audit_finding') {
      this.cols = LongByAuditFinding.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Long Outstanding Item Report by audit finding';
    } else if (this.branch_report.single_filter_info == 'date_range') {
      this.cols = LongByDateRange.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Long Outstanding Item Report by date range';
    } else if (this.branch_report.single_filter_info == 'amount') {
      this.cols = LongByAmount.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Long Outstanding Item Report by amount';
    } else {
      this.cols = LongByGeneral.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport = 'AFRFMS - Long Outstanding Item Report';
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

  tot_less_than_90_amount: number = 0;
  tot_greater_than_90_amount: number = 0;
  tot_greater_than_180_amount: number = 0;
  tot_greater_than_365_amount: number = 0;

  tot_less_than_90_number: number = 0;
  tot_greater_than_90_number: number = 0;
  tot_greater_than_180_number: number = 0;
  tot_greater_than_365_number: number = 0;

  tot_trial_balance: number = 0;
  tot_total_amount: number = 0;
  tot_difference: number = 0;

  calculate_totals(data: any) {
    this.tot_less_than_90_amount = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.less_than_90_amount),
      0
    );
    this.tot_greater_than_90_amount = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.greater_than_90_amount),
      0
    );
    this.tot_greater_than_180_amount = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.greater_than_180_amount),
      0
    );
    this.tot_greater_than_365_amount = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.greater_than_365_amount),
      0
    );

    this.tot_less_than_90_number = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.less_than_90_number),
      0
    );
    this.tot_greater_than_90_number = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.greater_than_90_number),
      0
    );
    this.tot_greater_than_180_number = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.greater_than_180_number),
      0
    );
    this.tot_greater_than_365_number = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.greater_than_365_number),
      0
    );

    this.tot_trial_balance = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.trial_balance),
      0
    );
    this.tot_total_amount = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.total_amount),
      0
    );
    this.tot_difference = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.difference),
      0
    );
  }
}
