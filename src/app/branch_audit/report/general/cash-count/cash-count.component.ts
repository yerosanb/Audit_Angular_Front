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

import { LoanByAuditFinding } from '../../payloads/LoanAdvance/loan-by-audit-finding';

import { CashCountByBranchName } from '../../payloads/cash-count/cash-count-by-branch-name';
import { CashCountByAuditPeriod } from '../../payloads/cash-count/cash-count-by-audit-period';
import { CashCountByRectificationDate } from '../../payloads/cash-count/cash-count-by-rectification-date';
import { CashCountByFindingStatus } from '../../payloads/cash-count/cash-count-by-finding-status';
import { CashCountByGeneral } from '../../payloads/cash-count/cash-count-by-general';
import { CashCountByDateRange } from '../../payloads/cash-count/cash-count-by-date-range';
import { CashCountByRegion } from '../../payloads/cash-count/cash-count-by-region';
import { CashCountPayload } from '../../payloads/cash-count/cash-count-payload';
import { CashCountByAmount } from '../../payloads/cash-count/cash-count-by-amount';
import { CashCountAuditFinding } from '../../payloads/cash-count/cash-count-by-audit-finding';
import { LoanByAmount } from '../../payloads/LoanAdvance/loan-by-amount';
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}
interface ExportColumn {
  title: string;
  dataKey: string;
}
interface CashType {
  type: string;
}

interface Number {
  range: string;

}

interface Amount {
  range: string;

}

@Component({
  selector: 'app-cash-count',
  templateUrl: './cash-count.component.html',
  styleUrls: ['./cash-count.component.css'],
})
export class CashCountComponent {
  maxDate: Date;
  visibled: boolean = false;
  newFinding: string;
  filter_spinner: boolean = false;
  regionOptions: Region[] = [];
  cashOptions: String[] = [];
  categoryOfDiscrepancyOptions: Branches[] = [];
  auditFindingOptions: FindingsR[] = [];
  auditFindingOption: FindingsR;
  branchOptions: BranchesR[] = [];
  branchHolder: BranchesR[] = [];
  branch_report = new CashCountPayload();
  searchClicked = false;
  stateOptions: any[];
  finding_status: any[];
  loading: boolean = false;
  selectedTitleForReport: string = 'AFRFMS - Findings Report';

  cashtype: CashType[] | undefined;

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
    this.cashtype = [
      { type: 'Local Currency' },
      { type: 'Foreign Currency' },
      { type: 'Petty Cash' },
      { type: 'ATM Cash' },
      { type: 'Other' },
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
    this.branch_report_service.getFindings('CashCount').subscribe({
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

  updateMaxValue() {
    if (this.branch_report.actual_cash_count_min != undefined)
      this.minValueForMax = this.branch_report.actual_cash_count_min;
  }

  updateMaxValue2() {
    if (this.branch_report.trial_balance_min != undefined)
      this.minValueForMax2 = this.branch_report.trial_balance_min;
  }

  // getCashCount() {
  //   this.branch_report_service.getCashCount().subscribe({
  //     next: (data) => {
  //       this.cashOptions = data;
  //     },
  //     error: (error) => {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Error',
  //         detail: 'Something went wrong while fetching regions!',
  //         life: 3000,
  //       });
  //     },
  //   });
  // }

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
      'case_number',
      'branch_name',
      'audit_finding',
      'auditor_name',
      'audit_impact',
      'auditor_recommendation',
      'auditee_response',
      'audit_finding_status',
      'cash_count_type',
      'actual_cash_count',
      'trial_balance',
      'atm_amount_branch',
      'trial_balance',
      'atm_amount_branch',
      'atm_amount_lobby',
      'difference',
      'audit_report_date',
      'rectified_on',
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

  exportDataColumns_ReportByBranchName: CashCountByBranchName[] = [];
  exportDataColumns_ReportByAuditPeriod: CashCountByAuditPeriod[] = [];
  exportDataColumns_ReportByRegion: CashCountByRegion[] = [];
  exportDataColumns_ReportByFindingStatus: CashCountByFindingStatus[] = [];
  exportDataColumns_ReportByRectificationDate: CashCountByRectificationDate[] =
    [];
  exportDataColumns_ReportByDateRange: CashCountByDateRange[] = [];
  exportDataColumns_ReportByGeneral: CashCountByGeneral[] = [];
  exportDataColumns_ReportByAmount: CashCountByAmount[] = [];
  exportDataColumns_ReportByAuditFinding: CashCountAuditFinding[] = [];

  exportExcel() {
    this.exportDataColumns_ReportByBranchName = [];
    this.exportDataColumns_ReportByAuditPeriod = [];
    this.exportDataColumns_ReportByRegion = [];
    this.exportDataColumns_ReportByFindingStatus = [];
    this.exportDataColumns_ReportByRectificationDate = [];
    this.exportDataColumns_ReportByAuditFinding = [];
    this.exportDataColumns_ReportByDateRange = [];
    this.exportDataColumns_ReportByGeneral = [];
    this.exportDataColumns_ReportByAmount = [];
    this.exportDataColumns_ReportByAuditFinding = [];

    let ReportByRegion_: CashCountByRegion = {
      id: undefined,
      case_number: undefined,

      region_name: undefined,
      audit_finding: undefined,
      actual_cash_count: undefined,
      trial_balance: undefined,
      atm_amount_branch: undefined,
      atm_amount_lobby: undefined,
      difference: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByBranchName_: CashCountByBranchName = {
      id: undefined,
      case_number: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      actual_cash_count: undefined,
      trial_balance: undefined,
      atm_amount_branch: undefined,
      atm_amount_lobby: undefined,
      difference: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByAuditfinding_: CashCountByAuditPeriod = {
      id: undefined,
      case_number: undefined,
      audit_period: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      actual_cash_count: undefined,
      trial_balance: undefined,
      atm_amount_branch: undefined,
      atm_amount_lobby: undefined,
      difference: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByAuditPeriod_: CashCountByAuditPeriod = {
      id: undefined,
      case_number: undefined,
      audit_period: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      actual_cash_count: undefined,
      trial_balance: undefined,
      atm_amount_branch: undefined,
      atm_amount_lobby: undefined,
      difference: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByFindingStatus_: CashCountByFindingStatus = {
      id: undefined,
      case_number: undefined,

      branch_name: undefined,
      audit_finding: undefined,
      actual_cash_count: undefined,
      trial_balance: undefined,
      atm_amount_branch: undefined,
      atm_amount_lobby: undefined,
      difference: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByRectificationDate_: CashCountByRectificationDate = {
      id: undefined,
      case_number: undefined,

      branch_name: undefined,
      audit_finding: undefined,
      actual_cash_count: undefined,
      trial_balance: undefined,
      atm_amount_branch: undefined,
      atm_amount_lobby: undefined,
      difference: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByAuditFinding_: LoanByAuditFinding = {
      branch_name: undefined,
      case_number: undefined,

      audit_finding: undefined,
      actual_cash_count: undefined,
      trial_balance: undefined,
      atm_amount_branch: undefined,
      atm_amount_lobby: undefined,
      difference: undefined,
      account_number: undefined,
      account_holder_name: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByAmount_: CashCountByAmount = {
      id: undefined,
      case_number: undefined,

      branch_name: undefined,
      audit_report_date: undefined,
      audit_finding: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      actual_cash_count: undefined,
      trial_balance: undefined,
      atm_amount_branch: undefined,
      atm_amount_lobby: undefined,
      difference: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByDateRange_: CashCountByDateRange = {
      id: undefined,
      case_number: undefined,

      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,

      actual_cash_count: undefined,
      trial_balance: undefined,
      atm_amount_branch: undefined,
      atm_amount_lobby: undefined,
      difference: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByGeneral_: CashCountByGeneral = {
      audit_report_date: undefined,
      case_number: undefined,

      branch_name: undefined,
      audit_finding: undefined,
      account_number: undefined,
      actual_cash_count: undefined,
      trial_balance: undefined,
      atm_amount_branch: undefined,
      atm_amount_lobby: undefined,
      difference: undefined,
      cash_count_type: undefined,
      loan_type: undefined,
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
        'AFRFMS - Cash Count Report by branch name'
      );
    } else if (this.selectedReportType == 'audit period') {
      this.exportReport_excel(
        'audit_period',
        ReportByAuditPeriod_,
        this.exportDataColumns_ReportByAuditPeriod,
        'Findings Report',
        'AFRFMS - Cash Count Report by audit period'
      );
    } else if (this.selectedReportType == 'region') {
      this.exportReport_excel(
        'region',
        ReportByRegion_,
        this.exportDataColumns_ReportByRegion,
        'Findings Report',
        'AFRFMS - Cash Count Report by region'
      );
    } else if (this.selectedReportType == 'finding_status') {
      this.exportReport_excel(
        'finding_status',
        ReportByFindingStatus_,
        this.exportDataColumns_ReportByFindingStatus,
        'Findings Report',
        'AFRFMS - Cash Count Report by finding status'
      );
    } else if (this.selectedReportType == 'audit_finding') {
      this.exportReport_excel(
        'audit_finding',
        ReportByFindingStatus_,
        this.exportDataColumns_ReportByAuditFinding,
        'Findings Report',
        'AFRFMS - Cash Count Report by audit finding'
      );
    } else if (this.selectedReportType == 'rectification_date_range') {
      this.exportReport_excel(
        'rectification_date_range',
        ReportByRectificationDate_,
        this.exportDataColumns_ReportByRectificationDate,
        'Findings Report',
        'AFRFMS - Cash Count Report by rectification date range'
      );
    } else if (this.selectedReportType == 'amount') {
      this.exportReport_excel(
        'amount',
        ReportByAmount_,
        this.exportDataColumns_ReportByAmount,
        'Findings Report',
        'AFRFMS - Cash Count Report by amount'
      );
    } else if (this.selectedReportType == 'audit_finding') {
      this.exportReport_excel(
        'audit_finding',
        ReportByAuditFinding_,
        this.exportDataColumns_ReportByAuditFinding,
        'Findings Report',
        'AFRFMS - Findings Report'
      );
    } else if (this.selectedReportType == 'date_range') {
      this.exportReport_excel(
        'date_range',
        ReportByDateRange_,
        this.exportDataColumns_ReportByDateRange,
        'Findings Report',
        'AFRFMS - Cash Count Report by date range'
      );
    } else {
      this.exportReport_excel(
        'general',
        ReportByGeneral_,
        this.exportDataColumns_ReportByGeneral,
        'Findings Report',
        'AFRFMS - Cash Count Report'
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

  clearDataReset() {
    this.onRegionCleared();
    this.minValueForMax = 0;
    this.minValueForMax2 = 0;
    this.branch_report = {
      ...Object.keys(this.branch_report).reduce(
        (acc, key) => ({ ...acc, [key]: undefined }),
        {}
      ),
    };
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

    {
      this.branch_report.category_of_discrepancy = this.branch_report
        .category_of_discrepancy
        ? this.categoryOfDiscrepancyOptions.find(
            (region) => region.id === this.branch_report.category_of_discrepancy
          )?.name
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
        this.branch_report.category_of_discrepancy !== undefined &&
        this.branch_report.category_of_discrepancy !== null
      )
        undefinedProperties.push('category_of_discrepancy');
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
        this.branch_report.audit_finding !== undefined &&
        this.branch_report.audit_finding !== null
      )
        undefinedProperties.push('audit_finding');

      if (
        (this.branch_report.actual_cash_count_min !== undefined &&
          this.branch_report.actual_cash_count_min !== null) ||
        (this.branch_report.actual_cash_count_max !== undefined &&
          this.branch_report.actual_cash_count_max !== null) ||
        (this.branch_report.trial_balance_min !== undefined &&
          this.branch_report.trial_balance_min !== null) ||
        (this.branch_report.trial_balance_max !== undefined &&
          this.branch_report.trial_balance_max !== null)
      )
        undefinedProperties.push('amount');
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
      .fetchReportCashCount(this.branch_report)
      .subscribe(
        (data: any) => {
          this.reportResponse = data;
          this.filter_spinner = false;
          this.searchClicked = true;
          this.calculate_totals(data);
          // data.forEach((element: any) => {
          //   console.log(JSON.stringify(element, null, 4))
          // });
        },
        (error: any) => {}
      );

    if (this.branch_report.single_filter_info == 'branch') {
      this.cols = CashCountByBranchName.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport = 'AFRFMS - Cash Count Report by branch';
    } else if (this.branch_report.single_filter_info == 'region') {
      this.cols = CashCountByRegion.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport = 'AFRFMS - Cash Count Report by region';
    } else if (this.branch_report.single_filter_info == 'finding_status') {
      this.cols = CashCountByFindingStatus.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Cash Count Report by finding status';
    } else if (
      this.branch_report.single_filter_info == 'rectification_date_range'
    ) {
      this.cols = CashCountByRectificationDate.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Cash Count Report by rectification date range';
    } else if (this.branch_report.single_filter_info == 'audit_finding') {
      this.cols = CashCountAuditFinding.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Cash Count Report by audit finding';
    } else if (this.branch_report.single_filter_info == 'date_range') {
      this.cols = CashCountByDateRange.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport = 'AFRFMS - Cash Count Report by date range';
    } else if (this.branch_report.single_filter_info == 'amount') {
      this.cols = CashCountByAmount.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport = 'AFRFMS - Cash Count Report by amount';
    } else {
      this.cols = CashCountByGeneral.getHeaders();
      
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport = 'AFRFMS - Cash Count Report';
    }
    console.log("regionLLLLLLLLLLLLL"+  this.branch_report.regional_compiler_compiled_date )
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

  tot_actual_cash_count: number = 0;
  tot_trial_balance: number = 0;
  tot_atm_amount_branch: number = 0;
  tot_atm_amount_lobby: number = 0;
  tot_difference: number = 0;

  calculate_totals(data: any) {
    this.tot_actual_cash_count = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.actual_cash_count),
      0
    );
    this.tot_trial_balance = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.trial_balance),
      0
    );
    this.tot_atm_amount_branch = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.atm_amount_branch),
      0
    );
    this.tot_atm_amount_lobby = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.atm_amount_lobby),
      0
    );
    this.tot_difference = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.difference),
      0
    );
  }
}
