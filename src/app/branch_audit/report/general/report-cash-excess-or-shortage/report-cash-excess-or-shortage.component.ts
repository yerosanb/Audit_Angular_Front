import { Component, OnInit } from '@angular/core';
import { Branches } from 'app/models/admin/branches';
import { Region } from 'app/models/admin/region';
import { ExportExcelService } from 'app/services/shared/export-excel.service';
import { StorageService } from 'app/services/shared/storage.service';
import { MessageService } from 'primeng/api';
import { BranchesR } from '../../payloads/branchesR';
import { FindingsR } from '../../payloads/findingsR';
import { BranchReportService } from '../../service/branch-report.service';
import { Table } from 'primeng/table';
import { BranchReportCashExcessOrShortage } from '../../payloads/Cash Excess or Shortage/BranchReportCashExcessOrShortage';
import { ReportByAuditFindingCashExcessOrShortage } from '../../payloads/Cash Excess or Shortage/report_by_audit_finding_cash_excess_or_shortage';
import { ReportByBranchNameCashExcessOrShortage } from '../../payloads/Cash Excess or Shortage/report_by_branch_name_cash_excess_or_shortage';
import { ReportByDateRangeCashExcessOrShortage } from '../../payloads/Cash Excess or Shortage/report_by_date_range_cash_excess_or_shortage';
import { ReportByAmountCashExcessOrShortage } from '../../payloads/Cash Excess or Shortage/report_by_amount_cash_excess_or_shortage';
import { ReportByFindingStatusCashExcessOrShortage } from '../../payloads/Cash Excess or Shortage/report_by_finding_status_cash_excess_or_shortage';
import { ReportByGeneralCashExcessOrShortage } from '../../payloads/Cash Excess or Shortage/report_by_general_cash_excess_or_shortage';
import { ReportByRectificationDateCashExcessOrShortage } from '../../payloads/Cash Excess or Shortage/report_by_rectification_date_cash_excess_or_shortage';
import { ReportByRegionCashExcessOrShortage } from '../../payloads/Cash Excess or Shortage/report_by_region_cash_excess_or_shortage';
import { ReportByAuditPeriodCashExcessOrShortage } from '../../payloads/Cash Excess or Shortage/report_by_audit_period_cash_excess_or_shortage';
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
  selector: 'app-report-cash-excess-or-shortage',
  templateUrl: './report-cash-excess-or-shortage.component.html',
  styleUrls: ['./report-cash-excess-or-shortage.component.css'],
})
export class ReportCashExcessOrShortageComponent implements OnInit {
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
  branch_report = new BranchReportCashExcessOrShortage();
  searchClicked = false;
  stateOptions: any[];
  finding_status: any[];
  loading: boolean = false;

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
  selectedTitleForReport: string = 'AFRFMS - Findings Report';
  bankingOptions: any[];
  cashTypeOptions: any[];

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
  }

  newFindingDialog() {
    this.visibled = true;
  }

  minValueForMax1 = 0;
  minValueForMax2 = 0;
  updateMaxValue() {
    if (this.branch_report.amount_shortage_min != undefined)
      this.minValueForMax1 = this.branch_report.amount_shortage_min;
    if (this.branch_report.amount_excess_min != undefined)
      this.minValueForMax2 = this.branch_report.amount_excess_min;
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
    this.branch_report_service.getFindings('CashPerformance').subscribe({
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
      'branch_name',
      'audit_finding',
      'amount_shortage',
      'amount_excess',
      // 'action_taken',
      'audit_impact',
      'auditor_recommendation',
      'auditee_response',
      'audit_finding_status',
      'rectified_on',
      'case_number',
      'audit_period',
      'audit_report_date',
      'region_name',
      // 'cash_type',
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

  exportDataColumns_ReportByBranchName: ReportByBranchNameCashExcessOrShortage[] =
    [];
  exportDataColumns_ReportByAuditPeriod: ReportByAuditPeriodCashExcessOrShortage[] =
    [];
  exportDataColumns_ReportByRegion: ReportByRegionCashExcessOrShortage[] = [];
  exportDataColumns_ReportByAmount: ReportByAmountCashExcessOrShortage[] = [];
  exportDataColumns_ReportByFindingStatus: ReportByFindingStatusCashExcessOrShortage[] =
    [];
  exportDataColumns_ReportByRectificationDate: ReportByRectificationDateCashExcessOrShortage[] =
    [];
  exportDataColumns_ReportByAuditFinding: ReportByAuditFindingCashExcessOrShortage[] =
    [];
  exportDataColumns_ReportByDateRange: ReportByDateRangeCashExcessOrShortage[] =
    [];
  exportDataColumns_ReportByGeneral: ReportByGeneralCashExcessOrShortage[] = [];

  exportExcel() {
    this.exportDataColumns_ReportByBranchName = [];
    this.exportDataColumns_ReportByAuditPeriod = [];
    this.exportDataColumns_ReportByRegion = [];
    this.exportDataColumns_ReportByAmount = [];
    this.exportDataColumns_ReportByFindingStatus = [];
    this.exportDataColumns_ReportByRectificationDate = [];
    this.exportDataColumns_ReportByAuditFinding = [];
    this.exportDataColumns_ReportByDateRange = [];
    this.exportDataColumns_ReportByGeneral = [];

    let ReportByAuditFinding_: ReportByAuditFindingCashExcessOrShortage = {
      branch_name: undefined,
      audit_finding: undefined,
      amount_shortage: undefined,
      amount_excess: undefined,
      action_taken: undefined,

      accountable_staff: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByAuditPeriod_: ReportByAuditPeriodCashExcessOrShortage = {
      case_number: undefined,
      audit_period: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      amount_shortage: undefined,
      amount_excess: undefined,
      action_taken: undefined,
      accountable_staff: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByBranchName_: ReportByBranchNameCashExcessOrShortage = {
      case_number: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      amount_shortage: undefined,
      amount_excess: undefined,
      action_taken: undefined,
      accountable_staff: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByDateRange_: ReportByDateRangeCashExcessOrShortage = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      amount_shortage: undefined,
      amount_excess: undefined,
      action_taken: undefined,
      accountable_staff: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByAmount_: ReportByAmountCashExcessOrShortage = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      amount_shortage: undefined,
      amount_excess: undefined,
      action_taken: undefined,
      accountable_staff: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByFindingStatus_: ReportByFindingStatusCashExcessOrShortage = {
      branch_name: undefined,
      audit_finding: undefined,
      amount_shortage: undefined,
      amount_excess: undefined,
      action_taken: undefined,
      accountable_staff: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByGeneral_: ReportByGeneralCashExcessOrShortage = {
      audit_report_date: undefined,
      case_number: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      amount_shortage: undefined,
      amount_excess: undefined,
      action_taken: undefined,
      accountable_staff: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByRectificationDate_: ReportByRectificationDateCashExcessOrShortage =
      {
        branch_name: undefined,
        audit_finding: undefined,
        amount_shortage: undefined,
        amount_excess: undefined,
        action_taken: undefined,
        accountable_staff: undefined,

        audit_impact: undefined,
        auditor_recommendation: undefined,
        auditee_response: undefined,
        audit_finding_status: undefined,
        rectified_on: undefined,
        cash_type: undefined,
      };
    let ReportByRegion_: ReportByRegionCashExcessOrShortage = {
      region_name: undefined,
      audit_finding: undefined,
      amount_shortage: undefined,
      amount_excess: undefined,
      action_taken: undefined,
      accountable_staff: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    {
      if (this.selectedReportType == 'branch') {
        this.exportReport_excel(
          'branch',
          ReportByBranchName_,
          this.exportDataColumns_ReportByBranchName,
          'Findings Report',
          'AFRFMS - Cash Excess or Shortage Report by branch name'
        );
        // } else if (this.selectedReportType == 'audit_report') {
        //   this.exportReport_excel(
        //     'audit_report',
        //     ReportByAuditPeriod_,
        //     this.exportDataColumns_ReportByAuditPeriod,
        //     'Findings Report',
        //     'AFRFMS - Findings Report'
        //   );
      } else if (this.selectedReportType == 'amount') {
        this.exportReport_excel(
          'amount',
          ReportByAmount_,
          this.exportDataColumns_ReportByAmount,
          'Findings Report',
          'AFRFMS - Cash Excess or Shortage Report by amount'
        );
      } else if (this.selectedReportType == 'region') {
        this.exportReport_excel(
          'region',
          ReportByRegion_,
          this.exportDataColumns_ReportByRegion,
          'Findings Report',
          'AFRFMS - Cash Excess or Shortage Report by region'
        );
      } else if (this.selectedReportType == 'finding_status') {
        this.exportReport_excel(
          'finding_status',
          ReportByFindingStatus_,
          this.exportDataColumns_ReportByFindingStatus,
          'Findings Report',
          'AFRFMS - Cash Excess or Shortage Report by finding status'
        );
      } else if (this.selectedReportType == 'rectification_date_range') {
        this.exportReport_excel(
          'rectification_date_range',
          ReportByRectificationDate_,
          this.exportDataColumns_ReportByRectificationDate,
          'Findings Report',
          'AFRFMS - Cash Excess or Shortage Report by rectification date'
        );
      } else if (this.selectedReportType == 'audit_finding') {
        this.exportReport_excel(
          'audit_finding',
          ReportByAuditFinding_,
          this.exportDataColumns_ReportByAuditFinding,
          'Findings Report',
          'AFRFMS - Cash Excess or Shortage Report by audit finding'
        );
      } else if (this.selectedReportType == 'date_range') {
        this.exportReport_excel(
          'date_range',
          ReportByDateRange_,
          this.exportDataColumns_ReportByDateRange,
          'Findings Report',
          'AFRFMS - Cash Excess or Shortage Report by Date of Discrepancy'
        );
      } else {
        this.exportReport_excel(
          'general',
          ReportByGeneral_,
          this.exportDataColumns_ReportByGeneral,
          'Findings Report',
          'AFRFMS - Cash Excess or Shortage Report'
        );
      }
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
    this.minValueForMax1 = 0;
    this.minValueForMax2 = 0;
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
        (this.branch_report.amount_shortage_min !== undefined &&
          this.branch_report.amount_shortage_min !== null) ||
        (this.branch_report.amount_shortage_max !== undefined &&
          this.branch_report.amount_shortage_max !== null) ||
        (this.branch_report.amount_excess_min !== undefined &&
          this.branch_report.amount_excess_min !== null) ||
        (this.branch_report.amount_excess_max !== undefined &&
          this.branch_report.amount_excess_max !== null)
      )
        undefinedProperties.push('amount');
      // if (
      //   this.branch_report.account_affected !== undefined &&
      //   this.branch_report.account_affected !== null &&
      //   this.branch_report.account_affected.trim() !== ''
      // )
      //   undefinedProperties.push('account_affected');

      // if (
      //   this.branch_report.card_issued_branch !== undefined &&
      //   this.branch_report.card_issued_branch !== null
      // )
      //   undefinedProperties.push('card_issued_branch');
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

    this.branch_report_service
      .fetchReportCashExcessOrShortage(this.branch_report)
      .subscribe(
        (data: any) => {
          this.reportResponse = data;
          this.filter_spinner = false;
          this.searchClicked = true;
          this.calculate_totals(data);
        },
        (error: any) => {
          console.error('error: ' + JSON.stringify(error, null, 4));
        }
      );

    if (this.branch_report.single_filter_info == 'branch') {
      this.cols = ReportByBranchNameCashExcessOrShortage.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Cash Excess or Shortage Report by branch name';
    } else if (this.branch_report.single_filter_info == 'region') {
      this.cols = ReportByRegionCashExcessOrShortage.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Cash Excess or Shortage Report by region';
    } else if (this.branch_report.single_filter_info == 'finding_status') {
      this.cols = ReportByFindingStatusCashExcessOrShortage.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Cash Excess or Shortage Report by finding status';
    } else if (
      this.branch_report.single_filter_info == 'rectification_date_range'
    ) {
      this.cols = ReportByRectificationDateCashExcessOrShortage.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Cash Excess or Shortage Report by rectification date';
    } else if (this.branch_report.single_filter_info == 'audit_finding') {
      this.cols = ReportByAuditFindingCashExcessOrShortage.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Cash Excess or Shortage Report by audit finding';
    } else if (this.branch_report.single_filter_info == 'date_range') {
      this.cols = ReportByDateRangeCashExcessOrShortage.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Cash Excess or Shortage Report by Date of Discrepancy';
    } else if (this.branch_report.single_filter_info == 'amount') {
      this.cols = ReportByAmountCashExcessOrShortage.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Cash Excess or Shortage Report by amount';
    } else {
      this.cols = ReportByGeneralCashExcessOrShortage.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport = 'AFRFMS - Cash Excess or Shortage Report';
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

  tot_amount_shortage: number = 0;
  tot_amount_excess: number = 0;

  calculate_totals(data: any) {
    this.tot_amount_shortage = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.amount_shortage),
      0
    );
    this.tot_amount_excess = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.amount_excess),
      0
    );
  }
}
