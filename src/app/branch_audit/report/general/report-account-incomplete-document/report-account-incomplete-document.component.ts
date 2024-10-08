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
import { BranchReportIncompleteDocument } from '../../payloads/Account Incomplete Document/BranchReportAccountIncompleteDocument';
import { ReportByAmountAbnormalBalance } from '../../payloads/Abnormal Balance/report_by_amount_abnormal_balance';
import { ReportByAuditFindingIncompleteDocument } from '../../payloads/Account Incomplete Document/report_by_audit_finding_account_incomplete_document';
import { ReportByBranchNameIncompleteDocument } from '../../payloads/Account Incomplete Document/report_by_branch_name_account_incomplete_document';
import { ReportByDateRangeIncompleteDocument } from '../../payloads/Account Incomplete Document/report_by_date_range_account_incomplete_document';
import { ReportByAmountIncompleteDocument } from '../../payloads/Account Incomplete Document/report_by_amount_account_incomplete_document';
import { ReportByFindingStatusIncompleteDocument } from '../../payloads/Account Incomplete Document/report_by_finding_status_account_incomplete_document';
import { ReportByGeneralIncompleteDocument } from '../../payloads/Account Incomplete Document/report_by_general_account_incomplete_document';
import { ReportByRectificationDateIncompleteDocument } from '../../payloads/Account Incomplete Document/report_by_rectification_date_account_incomplete_document';
import { ReportByRegionIncompleteDocument } from '../../payloads/Account Incomplete Document/report_by_region_account_incomplete_document';
import { ReportByAuditPeriodIncompleteDocument } from '../../payloads/Account Incomplete Document/report_by_audit_period_account_incomplete_document';

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
  selector: 'app-report-account-incomplete-document',
  templateUrl: './report-account-incomplete-document.component.html',
  styleUrls: ['./report-account-incomplete-document.component.css'],
})
export class ReportAccountIncompleteDocumentComponent implements OnInit {
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
  branch_report = new BranchReportIncompleteDocument();
  searchClicked = false;
  stateOptions: any[];
  finding_status: any[];
  loading: boolean = false;
  cashTypeOptions: any[];

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
    // this.branch_report.account_opened_amount_max = 0;
    // this.branch_report.account_opened_amount_min = 0;

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
  minValueForMax = 0;
  updateMaxValue() {
    if (this.branch_report.account_opened_amount_min != undefined)
      this.minValueForMax = this.branch_report.account_opened_amount_min;
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
    this.branch_report_service.getFindings('IncompleteAccount').subscribe({
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
      // 'account_type',
      // 'customer_name',
      // 'account_number',
      // 'account_opened_date',
      'account_opened_amount',
      // 'opened_by',
      // 'approved_by',
      // 'cash_type',
      'audit_impact',
      'auditor_recommendation',
      'auditee_response',
      'audit_finding_status',
      'rectified_on',
      'case_number',
      'audit_period',
      'branch_name',
      'audit_report_date',
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

  exportDataColumns_ReportByBranchName: ReportByBranchNameIncompleteDocument[] =
    [];
  exportDataColumns_ReportByAuditPeriod: ReportByAuditPeriodIncompleteDocument[] =
    [];
  exportDataColumns_ReportByRegion: ReportByRegionIncompleteDocument[] = [];
  exportDataColumns_ReportByFindingStatus: ReportByFindingStatusIncompleteDocument[] =
    [];
  exportDataColumns_ReportByAmount: ReportByAmountIncompleteDocument[] = [];
  exportDataColumns_ReportByRectificationDate: ReportByRectificationDateIncompleteDocument[] =
    [];
  exportDataColumns_ReportByAuditFinding: ReportByAuditFindingIncompleteDocument[] =
    [];
  exportDataColumns_ReportByDateRange: ReportByDateRangeIncompleteDocument[] =
    [];
  exportDataColumns_ReportByGeneral: ReportByGeneralIncompleteDocument[] = [];

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

    let ReportByRegion_: ReportByRegionIncompleteDocument = {
      region_name: undefined,
      audit_finding: undefined,
      account_type: undefined,
      customer_name: undefined,
      account_number: undefined,
      account_opened_date: undefined,
      account_opened_amount: undefined,
      opened_by: undefined,
      approved_by: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByAuditFinding_: ReportByAuditFindingIncompleteDocument = {
      branch_name: undefined,
      audit_finding: undefined,
      account_type: undefined,
      customer_name: undefined,
      account_number: undefined,
      account_opened_date: undefined,
      account_opened_amount: undefined,
      opened_by: undefined,
      approved_by: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByAuditPeriod_: ReportByAuditPeriodIncompleteDocument = {
      case_number: undefined,
      audit_period: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      account_type: undefined,
      customer_name: undefined,
      account_number: undefined,
      account_opened_date: undefined,
      account_opened_amount: undefined,
      opened_by: undefined,
      approved_by: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByBranchName_: ReportByBranchNameIncompleteDocument = {
      case_number: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      account_type: undefined,
      customer_name: undefined,
      account_number: undefined,
      account_opened_date: undefined,
      account_opened_amount: undefined,
      opened_by: undefined,
      approved_by: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByDateRange_: ReportByDateRangeIncompleteDocument = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      account_type: undefined,
      customer_name: undefined,
      account_number: undefined,
      account_opened_date: undefined,
      account_opened_amount: undefined,
      opened_by: undefined,
      approved_by: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByAmount_: ReportByAmountIncompleteDocument = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      account_type: undefined,
      customer_name: undefined,
      account_number: undefined,
      account_opened_date: undefined,
      account_opened_amount: undefined,
      opened_by: undefined,
      approved_by: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByFindingStatus_: ReportByFindingStatusIncompleteDocument = {
      branch_name: undefined,
      audit_finding: undefined,
      account_type: undefined,
      customer_name: undefined,
      account_number: undefined,
      account_opened_date: undefined,
      account_opened_amount: undefined,
      opened_by: undefined,
      approved_by: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByGeneral_: ReportByGeneralIncompleteDocument = {
      case_number: undefined,
      branch_name: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      audit_report_date: undefined,
      audit_finding: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      account_type: undefined,
      customer_name: undefined,
      account_number: undefined,
      account_opened_date: undefined,
      account_opened_amount: undefined,
      opened_by: undefined,
      approved_by: undefined,
      auditee_response: undefined,
      cash_type: undefined,
    };
    let ReportByRectificationDate_: ReportByRectificationDateIncompleteDocument =
      {
        branch_name: undefined,
        audit_finding: undefined,
        account_type: undefined,
        customer_name: undefined,
        account_number: undefined,
        account_opened_date: undefined,
        account_opened_amount: undefined,
        opened_by: undefined,
        approved_by: undefined,
        audit_impact: undefined,
        auditor_recommendation: undefined,
        auditee_response: undefined,
        audit_finding_status: undefined,
        rectified_on: undefined,
        cash_type: undefined,
      };

    if (this.selectedReportType == 'branch') {
      this.exportReport_excel(
        'branch',
        ReportByBranchName_,
        this.exportDataColumns_ReportByBranchName,
        'Findings Report',
        'AFRFMS - AOW Incomplete Document Report by branch name'
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
        'Amount',
        ReportByAmount_,
        this.exportDataColumns_ReportByAmount,
        'Findings Report',
        'AFRFMS - AOW Incomplete Document Report by amount'
      );
    } else if (this.selectedReportType == 'region') {
      this.exportReport_excel(
        'region',
        ReportByRegion_,
        this.exportDataColumns_ReportByRegion,
        'Findings Report',
        'AFRFMS - AOW Incomplete Document Report by region'
      );
    } else if (this.selectedReportType == 'finding_status') {
      this.exportReport_excel(
        'finding_status',
        ReportByFindingStatus_,
        this.exportDataColumns_ReportByFindingStatus,
        'Findings Report',
        'AFRFMS - AOW Incomplete Document Report by finding status'
      );
    } else if (this.selectedReportType == 'rectification_date_range') {
      this.exportReport_excel(
        'rectification_date_range',
        ReportByRectificationDate_,
        this.exportDataColumns_ReportByRectificationDate,
        'Findings Report',
        'AFRFMS - AOW Incomplete Document Report by rectification date'
      );
    } else if (this.selectedReportType == 'audit_finding') {
      this.exportReport_excel(
        'audit_finding',
        ReportByAuditFinding_,
        this.exportDataColumns_ReportByAuditFinding,
        'Findings Report',
        'AFRFMS - AOW Incomplete Document Report by audit finding'
      );
    } else if (this.selectedReportType == 'date_range') {
      this.exportReport_excel(
        'date_range',
        ReportByDateRange_,
        this.exportDataColumns_ReportByDateRange,
        'Findings Report',
        'AFRFMS - AOW Incomplete Document Report by Date of Discrepancy'
      );
    } else {
      this.exportReport_excel(
        'general',
        ReportByGeneral_,
        this.exportDataColumns_ReportByGeneral,
        'Findings Report',
        'AFRFMS - AOW Incomplete Document Report'
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
      this.branch_report.account_opened_date_range == null
        ? (this.branch_report.account_opened_date_range = ['', ''])
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
        (this.branch_report.account_opened_amount_max !== undefined &&
          this.branch_report.account_opened_amount_max !== null) ||
        (this.branch_report.account_opened_amount_min !== undefined &&
          this.branch_report.account_opened_amount_min !== null)
      )
        undefinedProperties.push('amount');
      if (
        this.branch_report.account_number !== undefined &&
        this.branch_report.account_number !== null &&
        this.branch_report.account_number.trim() !== ''
      )
        undefinedProperties.push('account_number');
      if (
        this.branch_report.account_opened_date_range[0] != '' ||
        this.branch_report.account_opened_date_range[1] != ''
      )
        undefinedProperties.push('account_opened_date_range');
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
      .fetchReportIncompleteDocument(this.branch_report)
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
      this.cols = ReportByBranchNameIncompleteDocument.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - AOW Incomplete Document Report by branch name';
    } else if (this.branch_report.single_filter_info == 'region') {
      this.cols = ReportByRegionIncompleteDocument.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - AOW Incomplete Document Report by region';
    } else if (this.branch_report.single_filter_info == 'finding_status') {
      this.cols = ReportByFindingStatusIncompleteDocument.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - AOW Incomplete Document Report by finding status';
    } else if (
      this.branch_report.single_filter_info == 'rectification_date_range'
    ) {
      this.cols = ReportByRectificationDateIncompleteDocument.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - AOW Incomplete Document Report by rectification date';
    } else if (this.branch_report.single_filter_info == 'audit_finding') {
      this.cols = ReportByAuditFindingIncompleteDocument.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - AOW Incomplete Document Report by audit finding';
    } else if (this.branch_report.single_filter_info == 'date_range') {
      this.cols = ReportByDateRangeIncompleteDocument.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - AOW Incomplete Document Report by Date of Discrepancy';
    } else if (this.branch_report.single_filter_info == 'amount') {
      this.cols = ReportByAmountIncompleteDocument.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - AOW Incomplete Document Report by amount';
    } else {
      this.cols = ReportByGeneralIncompleteDocument.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport = 'AFRFMS - AOW Incomplete Document Report';
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
        this.branch_report.account_opened_date_range != undefined &&
        this.branch_report.account_opened_date_range[0] == '' &&
        this.branch_report.account_opened_date_range[1] == ''
      )
        this.branch_report.account_opened_date_range = undefined;

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
  tot_account_opened_amount: number = 0;

  calculate_totals(data: any) {
    this.tot_account_opened_amount = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.account_opened_amount),
      0
    );
  }
}
