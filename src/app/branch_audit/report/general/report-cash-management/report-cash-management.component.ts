import { Component, OnInit } from '@angular/core';
import { Branches } from 'app/models/admin/branches';
import { Region } from 'app/models/admin/region';
import { ExportExcelService } from 'app/services/shared/export-excel.service';
import { StorageService } from 'app/services/shared/storage.service';
import { MessageService } from 'primeng/api';
import { BranchesR } from '../../payloads/branchesR';
import { FindingsR } from '../../payloads/findingsR';
import { ReportByAuditFinding } from '../../payloads/report_by_audit_finding';
import { ReportByAuditPeriod } from '../../payloads/report_by_audit_period';
import { ReportByBranchName } from '../../payloads/report_by_branch_name';
import { ReportByDateRange } from '../../payloads/report_by_date_range';
import { ReportByFindingStatus } from '../../payloads/report_by_finding_status';
import { ReportByGeneral } from '../../payloads/report_by_general';
import { ReportByRectificationDate } from '../../payloads/report_by_rectification_date';
import { ReportByRegion } from '../../payloads/report_by_region';
import { BranchReportService } from '../../service/branch-report.service';
import { Table } from 'primeng/table';
import { BranchReportCashManagement } from '../../payloads/Cash Management/BranchReportCashManagement';
import { ReportByAmountCashManagement } from '../../payloads/Cash Management/report_by_amount_cash_management';
import { ReportByAuditFindingCashManagement } from '../../payloads/Cash Management/report_by_audit_finding_cash_management';
import { ReportByAuditPeriodCashManagement } from '../../payloads/Cash Management/report_by_audit_period_cash_management';
import { ReportByBranchNameCashManagement } from '../../payloads/Cash Management/report_by_branch_name_cash_management';
import { ReportByDateRangeCashManagement } from '../../payloads/Cash Management/report_by_date_range_cash_management';
import { ReportByFindingStatusCashManagement } from '../../payloads/Cash Management/report_by_finding_status_cash_management';
import { ReportByGeneralCashManagement } from '../../payloads/Cash Management/report_by_general_cash_management';
import { ReportByRectificationDateCashManagement } from '../../payloads/Cash Management/report_by_rectification_date_cash_management';
import { ReportByRegionCashManagement } from '../../payloads/Cash Management/report_by_region_cash_management';

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
  selector: 'app-report-cash-management',
  templateUrl: './report-cash-management.component.html',
  styleUrls: ['./report-cash-management.component.css'],
})
export class ReportCashManagementComponent implements OnInit {
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
  branch_report = new BranchReportCashManagement();
  searchClicked = false;
  stateOptions: any[];
  cashTypeOptions: any[];
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
  ingOptions: any[];
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
    this.ingOptions = [
      { label: 'Conventional', value: 'conventional' },
      { label: 'IFB', value: 'ifb' },
    ];
    this.stateOptions = [
      { label: 'Rectified', value: 1 },
      // { label: 'Partially', value: 2 },
      { label: 'Unrectified', value: 3 },
    ];
    this.cashTypeOptions = [
      { label: 'FCY', value: 1 },
      { label: 'LCY', value: 2 },
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

  minValueForMax1 = 0;
  minValueForMax2 = 0;
  updateMaxValue() {
    if (this.branch_report.mid_rate_fcy_min != undefined)
      this.minValueForMax1 = this.branch_report.mid_rate_fcy_min;
    if (this.branch_report.average_cash_holding_min != undefined)
      this.minValueForMax2 = this.branch_report.average_cash_holding_min;
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
    this.branch_report_service.getFindings('CashManagement').subscribe({
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
      'region_name',
      'audit_finding',
      'average_cash_holding',
      'branch_cash_set_limit',
      'mid_rate_fcy',
      'difference',
      // 'cash_type',
      'audit_impact',
      'auditor_recommendation',
      'auditee_response',
      'audit_finding_status',
      'rectified_on',
      'branch_name',
      'audit_report_date',
      'case_number',
      'audit_period',
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

  exportDataColumns_ReportByBranchName: ReportByBranchNameCashManagement[] = [];
  exportDataColumns_ReportByAuditPeriod: ReportByAuditPeriodCashManagement[] =
    [];
  exportDataColumns_ReportByRegion: ReportByRegionCashManagement[] = [];
  exportDataColumns_ReportByAmount: ReportByAmountCashManagement[] = [];
  exportDataColumns_ReportByFindingStatus: ReportByFindingStatusCashManagement[] =
    [];
  exportDataColumns_ReportByRectificationDate: ReportByRectificationDateCashManagement[] =
    [];
  exportDataColumns_ReportByAuditFinding: ReportByAuditFindingCashManagement[] =
    [];
  exportDataColumns_ReportByDateRange: ReportByDateRangeCashManagement[] = [];
  exportDataColumns_ReportByGeneral: ReportByGeneralCashManagement[] = [];

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

    let ReportByRegion_: ReportByRegionCashManagement = {
      region_name: undefined,
      audit_finding: undefined,
      average_cash_holding: undefined,
      branch_cash_set_limit: undefined,
      mid_rate_fcy: undefined,
      difference: undefined,
      cash_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByRectificationDate_: ReportByRectificationDateCashManagement = {
      branch_name: undefined,
      audit_finding: undefined,
      average_cash_holding: undefined,
      branch_cash_set_limit: undefined,
      mid_rate_fcy: undefined,
      difference: undefined,
      cash_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByGeneral_: ReportByGeneralCashManagement = {
      audit_report_date: undefined,
      case_number: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      average_cash_holding: undefined,
      branch_cash_set_limit: undefined,
      mid_rate_fcy: undefined,
      difference: undefined,
      cash_type: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByFindingStatus_: ReportByFindingStatusCashManagement = {
      branch_name: undefined,
      audit_finding: undefined,
      average_cash_holding: undefined,
      branch_cash_set_limit: undefined,
      mid_rate_fcy: undefined,
      difference: undefined,
      cash_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByAmount_: ReportByAmountCashManagement = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      average_cash_holding: undefined,
      branch_cash_set_limit: undefined,
      mid_rate_fcy: undefined,
      difference: undefined,
      cash_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByDateRange_: ReportByDateRangeCashManagement = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      average_cash_holding: undefined,
      branch_cash_set_limit: undefined,
      mid_rate_fcy: undefined,
      difference: undefined,
      cash_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByBranchName_: ReportByBranchNameCashManagement = {
      case_number: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      average_cash_holding: undefined,
      branch_cash_set_limit: undefined,
      mid_rate_fcy: undefined,
      difference: undefined,
      cash_type: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByAuditPeriod_: ReportByAuditPeriodCashManagement = {
      case_number: undefined,
      audit_period: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      average_cash_holding: undefined,
      branch_cash_set_limit: undefined,
      mid_rate_fcy: undefined,
      difference: undefined,
      cash_type: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByAuditFinding_: ReportByAuditFindingCashManagement = {
      branch_name: undefined,
      audit_finding: undefined,
      average_cash_holding: undefined,
      branch_cash_set_limit: undefined,
      mid_rate_fcy: undefined,
      difference: undefined,
      cash_type: undefined,
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
        'AFRFMS - Cash Management Report by branch name'
      );
      // } else if (this.selectedReportType == 'audit_report') {
      //   this.exportReport_excel(
      //     'audit_report',
      //     ReportByAuditPeriod_,
      //     this.exportDataColumns_ReportByAuditPeriod,
      //     'Findings Report',
      //     'AFRFMS - Findings Report'
      //   );
    } else if (this.selectedReportType == 'region') {
      this.exportReport_excel(
        'region',
        ReportByRegion_,
        this.exportDataColumns_ReportByRegion,
        'Findings Report',
        'AFRFMS - Cash Management Report by region'
      );
    } else if (this.selectedReportType == 'amount') {
      this.exportReport_excel(
        'amount',
        ReportByAmount_,
        this.exportDataColumns_ReportByAmount,
        'Findings Report',
        'AFRFMS - Cash Management Report by amount'
      );
    } else if (this.selectedReportType == 'finding_status') {
      this.exportReport_excel(
        'finding_status',
        ReportByFindingStatus_,
        this.exportDataColumns_ReportByFindingStatus,
        'Findings Report',
        'AFRFMS - Cash Management Report by finding status'
      );
    } else if (this.selectedReportType == 'rectification_date_range') {
      this.exportReport_excel(
        'rectification_date_range',
        ReportByRectificationDate_,
        this.exportDataColumns_ReportByRectificationDate,
        'Findings Report',
        'AFRFMS - Cash Management Report by rectification date'
      );
    } else if (this.selectedReportType == 'audit_finding') {
      this.exportReport_excel(
        'audit_finding',
        ReportByAuditFinding_,
        this.exportDataColumns_ReportByAuditFinding,
        'Findings Report',
        'AFRFMS - Cash Management Report by audit finding'
      );
    } else if (this.selectedReportType == 'date_range') {
      this.exportReport_excel(
        'date_range',
        ReportByDateRange_,
        this.exportDataColumns_ReportByDateRange,
        'Findings Report',
        'AFRFMS - Cash Management Report by Date of Discrepancy'
      );
    } else {
      this.exportReport_excel(
        'general',
        ReportByGeneral_,
        this.exportDataColumns_ReportByGeneral,
        'Findings Report',
        'AFRFMS - Cash Management Report'
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
        (this.branch_report.mid_rate_fcy_min !== undefined &&
          this.branch_report.mid_rate_fcy_min !== null) ||
        (this.branch_report.mid_rate_fcy_max !== undefined &&
          this.branch_report.mid_rate_fcy_max !== null) ||
        (this.branch_report.average_cash_holding_min !== undefined &&
          this.branch_report.average_cash_holding_min !== null) ||
        (this.branch_report.average_cash_holding_max !== undefined &&
          this.branch_report.average_cash_holding_max !== null)
      )
        undefinedProperties.push('amount');
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
      .fetchReportCashManagement(this.branch_report)
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
      this.cols = ReportByBranchNameCashManagement.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport = 'AFRFMS - Cash Management Report by branch';
    } else if (this.branch_report.single_filter_info == 'region') {
      this.cols = ReportByRegionCashManagement.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport = 'AFRFMS - Cash Management Report by region';
    } else if (this.branch_report.single_filter_info == 'finding_status') {
      this.cols = ReportByFindingStatusCashManagement.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Cash Management Report by finding status';
    } else if (
      this.branch_report.single_filter_info == 'rectification_date_range'
    ) {
      this.cols = ReportByRectificationDateCashManagement.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Cash Management Report by rectification date';
    } else if (this.branch_report.single_filter_info == 'audit_finding') {
      this.cols = ReportByAuditFindingCashManagement.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Cash Management Report by audit finding';
    } else if (this.branch_report.single_filter_info == 'date_range') {
      this.cols = ReportByDateRangeCashManagement.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Cash Management Report by Date of Discrepancy';
    } else if (this.branch_report.single_filter_info == 'amount') {
      this.cols = ReportByAmountCashManagement.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport = 'AFRFMS - Cash Management Report by amount';
    } else {
      this.cols = ReportByGeneralCashManagement.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport = 'AFRFMS - Cash Management Report';
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

  tot_average_cash_holding: number = 0;
  tot_branch_cash_set_limit: number = 0;
  tot_mid_rate_fcy: number = 0;
  tot_difference: number = 0;

  calculate_totals(data: any) {
    this.tot_average_cash_holding = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.average_cash_holding),
      0
    );
    this.tot_branch_cash_set_limit = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.branch_cash_set_limit),
      0
    );
    this.tot_mid_rate_fcy = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.mid_rate_fcy),
      0
    );
    this.tot_difference = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.difference),
      0
    );
  }
}
