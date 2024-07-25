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
import { LoanPayload } from '../../payloads/LoanAdvance/loan-payload';
import { LoanByAuditPeriod } from '../../payloads/LoanAdvance/loan-by-audit-period';
import { LoanByBranchName } from '../../payloads/LoanAdvance/loan-by-branch-name';
import { LoanByRegion } from '../../payloads/LoanAdvance/loan-by-region';
import { LoanByRectificationDate } from '../../payloads/LoanAdvance/loan-by-rectification-date';
import { LoanByFindingStatus } from '../../payloads/LoanAdvance/loan-by-finding-status';
import { LoanByAuditFinding } from '../../payloads/LoanAdvance/loan-by-audit-finding';
import { LoanByDateRange } from '../../payloads/LoanAdvance/loan-by-date-range';
import { LoanByGeneral } from '../../payloads/LoanAdvance/loan-by-general';
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

@Component({
  selector: 'app-loan-and-advance',
  templateUrl: './loan-and-advance.component.html',
  styleUrls: ['./loan-and-advance.component.css'],
})
export class LoanAndAdvanceComponent {
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
  branch_report = new LoanPayload();
  searchClicked = false;
  stateOptions: any[];
  bankingOptions: any[];
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
  minValueForMax: any = 0;

  commonLoanTypes: any[];
  IFBLoanTypes: any[];
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

    this.stateOptions = [
      { label: 'Rectified', value: 1 },
      { label: 'Unrectified', value: 3 },
    ];

    this.cashTypeOptions = [
      { label: 'FCY', value: 1 },
      { label: 'LCY', value: 2 },
    ];

    this.bankingOptions = [
      { label: 'Conventional', value: 'conventional' },
      { label: 'IFB', value: 'ifb' },
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

    this.commonLoanTypes = [
      { loan_type: 'Education and Health Services Loans' },
      { loan_type: 'AWASH BANK STAFF HOUSING AND CAR LOANS' },
      { loan_type: 'AGRI PROD. TERM LOANS DEF' },
      { loan_type: 'AGRICULTURAL PROD. OVERDRAFT-DEF' },
      { loan_type: 'TRANSPORT OVERDRAFT-DEF' },
      { loan_type: 'MANUFACTURING PROD. OVERDRAFT-DEF' },
      { loan_type: 'DOMESTIC TRADE & SERV. OVRDRFT-DEF' },
      { loan_type: 'TRANSPORT TERM LOANS DEF	' },
      { loan_type: 'MANUFACT PROD. TERM LOANS DEF' },
      { loan_type: 'EXPORT OVERDRAFT-DEF' },
      { loan_type: 'ADVANCE AGAINST EXPORT BILLS-DEF' },
      { loan_type: 'DOM TRADE & SERV. TERM LN DEF' },
      { loan_type: 'EXPORT TERM LOANS DEF' },
      { loan_type: 'IMPORT OVERDRAFT-DEF' },
      { loan_type: 'AGRO PROCESSING TERM LOAN SME-FP DEF' },
      { loan_type: 'BUILDING & CONSTR. OVERDRAFT-DEF' },
      { loan_type: 'MERCHANDISE LOAN-DEF' },
      { loan_type: 'IMPORT TERM LOANS DEF	' },
      { loan_type: 'BUILDING & CONSTR. TERM LOANS DEF' },
      { loan_type: 'PERSONAL LOANS DEF' },
      { loan_type: 'Hotel and Tourism Loans	' },
      { loan_type: 'CREDIT CARD POOL ACCOUNT' },
      { loan_type: "AB-MCF MSE's Resilience Facility" },
      { loan_type: 'Other' },
    ];

    this.IFBLoanTypes = [
      {
        loan_type:
          'Qard Financing (Interest free export financing facility)-IFB-DEF',
      },
      { loan_type: 'DTS MURABAHA FINANCING-DEF' },
      { loan_type: ' BUILDING & CONST. MURABAHA FIN-DEF' },
      { loan_type: 'Murabaha-DTS-Default' },
      { loan_type: 'Murabaha-Import-Default' },
      { loan_type: 'Murabaha-Import-Default' },
      { loan_type: 'Murabaha-Transport-Default' },
      { loan_type: 'Murabaha-Staff Housing & Car Financing' },
      { loan_type: 'Murabaha-Staff Housing & Car Financing' },
      { loan_type: 'PERSONAL LOANS DEF' },
      { loan_type: 'Murabaha Hotel and Tourism Financing' },
      { loan_type: 'Other' },
    ];
  }

  bankingOnChange() {
    this.branch_report.loan_type = undefined;
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
    this.branch_report_service.getFindings('LoanAndAdvance').subscribe({
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
    if (this.branch_report.min_amount != undefined)
      this.minValueForMax = this.branch_report.min_amount;
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
      'case_number',
      'branch_name',
      'audit_finding',
      'auditor_name',
      'audit_impact',
      'auditor_recommendation',
      'auditee_response',
      'audit_finding_status',
      'amount',
      'loan_disburse_date',
      'account_number',
      'borrower_name',
      'amount_granted',
      'interest_rate',
      'loan_status',
      'arrears',
      'due_date',
      'overdraft',
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

  exportDataColumns_ReportByBranchName: LoanByBranchName[] = [];
  exportDataColumns_ReportByAuditPeriod: LoanByAuditPeriod[] = [];
  exportDataColumns_ReportByRegion: LoanByRegion[] = [];
  exportDataColumns_ReportByFindingStatus: LoanByFindingStatus[] = [];
  exportDataColumns_ReportByRectificationDate: LoanByRectificationDate[] = [];
  exportDataColumns_ReportByAuditFinding: LoanByAuditFinding[] = [];
  exportDataColumns_ReportByDateRange: LoanByDateRange[] = [];
  exportDataColumns_ReportByAmount: LoanByAmount[] = [];

  exportDataColumns_ReportByGeneral: LoanByGeneral[] = [];

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

    let ReportByRegion_: LoanByRegion = {
      region_name: undefined,
      audit_finding: undefined,

      amount_granted: undefined,
      interest_rate: undefined,
      arrears: undefined,
      trial_balance: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByBranchName_: LoanByBranchName = {
      case_number: undefined,
      branch_name: undefined,
      audit_finding: undefined,

      amount_granted: undefined,
      interest_rate: undefined,
      arrears: undefined,
      trial_balance: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByAuditPeriod_: LoanByAuditPeriod = {
      case_number: undefined,
      audit_period: undefined,
      branch_name: undefined,
      audit_finding: undefined,

      amount_granted: undefined,
      interest_rate: undefined,
      arrears: undefined,
      trial_balance: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByFindingStatus_: LoanByFindingStatus = {
      branch_name: undefined,
      audit_finding: undefined,

      amount_granted: undefined,
      interest_rate: undefined,
      arrears: undefined,
      trial_balance: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByAmount_: LoanByAmount = {
      branch_name: undefined,
      audit_report_date: undefined,
      audit_finding: undefined,

      amount_granted: undefined,
      interest_rate: undefined,
      arrears: undefined,
      trial_balance: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByRectificationDate_: LoanByRectificationDate = {
      branch_name: undefined,
      audit_finding: undefined,

      amount_granted: undefined,
      interest_rate: undefined,
      arrears: undefined,
      trial_balance: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByAuditFinding_: LoanByAuditFinding = {
      branch_name: undefined,
      audit_finding: undefined,

      amount_granted: undefined,
      interest_rate: undefined,
      arrears: undefined,
      trial_balance: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByDateRange_: LoanByDateRange = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,

      amount_granted: undefined,
      interest_rate: undefined,
      arrears: undefined,
      trial_balance: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByGeneral_: LoanByGeneral = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,

      amount_granted: undefined,
      interest_rate: undefined,
      arrears: undefined,
      trial_balance: undefined,

      loan_disburse_date: undefined,
      account_number: undefined,
      borrower_name: undefined,
      loan_type: undefined,
      loan_status: undefined,
      due_date: undefined,
      overdraft: undefined,

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
        'AFRFMS - Loand and Advance Report by branch name'
      );
    } else if (this.selectedReportType == 'audit_period') {
      this.exportReport_excel(
        'audit_period',
        ReportByAuditPeriod_,
        this.exportDataColumns_ReportByAuditPeriod,
        'Findings Report',
        'AFRFMS - Loan and Advance Report by audit period '
      );
    } else if (this.selectedReportType == 'region') {
      this.exportReport_excel(
        'region',
        ReportByRegion_,
        this.exportDataColumns_ReportByRegion,
        'Findings Report',
        'AFRFMS - Loan and Advance Report by region'
      );
    } else if (this.selectedReportType == 'amount') {
      this.exportReport_excel(
        'date_range',
        ReportByAmount_,
        this.exportDataColumns_ReportByAmount,
        'Findings Report',
        'AFRFMS -   Loan and Advance Report by amount'
      );
    } else if (this.selectedReportType == 'finding_status') {
      this.exportReport_excel(
        'finding_status',
        ReportByFindingStatus_,
        this.exportDataColumns_ReportByFindingStatus,
        'Findings Report',
        'AFRFMS - Loan and Advance Report by finding statust'
      );
    } else if (this.selectedReportType == 'rectification_date_range') {
      this.exportReport_excel(
        'rectification_date_range',
        ReportByRectificationDate_,
        this.exportDataColumns_ReportByRectificationDate,
        'Findings Report',
        'AFRFMS - Loan and Advance Report by rectification date range'
      );
    } else if (this.selectedReportType == 'audit_finding') {
      this.exportReport_excel(
        'audit_finding',
        ReportByAuditFinding_,
        this.exportDataColumns_ReportByAuditFinding,
        'Findings Report',
        'AFRFMS - Loan and Advance Report by audit finding'
      );
    } else if (this.selectedReportType == 'date_range') {
      this.exportReport_excel(
        'date_range',
        ReportByDateRange_,
        this.exportDataColumns_ReportByDateRange,
        'Findings Report',
        'AFRFMS - Loan and Advance Report by date range'
      );
    } else {
      this.exportReport_excel(
        'general',
        ReportByGeneral_,
        this.exportDataColumns_ReportByGeneral,
        'Findings Report',
        'AFRFMS - Loan and Advance Report'
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
      this.branch_report.loan_type =
        this.branch_report.date_range == null
          ? ''
          : this.branch_report.loan_type;
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
      this.branch_report.cash_type = this.branch_report.cash_type
        ? this.cashTypeOptions.find(
            (kdb) => kdb.value === this.branch_report.cash_type
          )?.label
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
        this.branch_report.loan_type !== undefined &&
        this.branch_report.loan_type !== null
      )
        undefinedProperties.push('loan_type');
      if (
        this.branch_report.account_number !== undefined &&
        this.branch_report.account_number !== null
      )
        undefinedProperties.push('account_number');

      if (
        (this.branch_report.granted_amount_min !== undefined &&
          this.branch_report.granted_amount_min !== null) ||
        (this.branch_report.granted_amount_max !== undefined &&
          this.branch_report.granted_amount_max !== null)
      )
        undefinedProperties.push('amount');
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
      .fetchReportLoanAdvance(this.branch_report)
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
      this.cols = LoanByBranchName.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Loan and Advance Report by branch';
    } else if (this.branch_report.single_filter_info == 'region') {
      this.cols = LoanByRegion.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Loan and Advance Report by region';
    } else if (this.branch_report.single_filter_info == 'finding_status') {
      this.cols = LoanByFindingStatus.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Loan and Advance Report by finding status';
    } else if (this.branch_report.single_filter_info == 'amount') {
      this.cols = LoanByAmount.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Loan and Advance Report by Amount';
    } else if (
      this.branch_report.single_filter_info == 'rectification_date_range'
    ) {
      this.cols = LoanByRectificationDate.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Loan and Advance Report by rectification date range';
    } else if (this.branch_report.single_filter_info == 'audit_finding') {
      this.cols = LoanByAuditFinding.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Loan and Advance Report by audit finding';
    } else if (this.branch_report.single_filter_info == 'date_range') {
      this.cols = LoanByDateRange.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Loan and Advance Report by date range';
    } else {
      this.cols = LoanByGeneral.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport = 'AFRFMS - Loan and Advance Report';
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

  tot_amount_granted: number = 0;
  tot_interest_rate: number = 0;
  tot_arrears: number = 0;
  tot_approved_amount: number = 0;
  tot_overdrawn_balance: number = 0;
  tot_difference: number = 0;
  tot_penality_charge_collection: number = 0;

  calculate_totals(data: any) {
    this.tot_amount_granted = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.amount_granted),
      0
    );
    this.tot_interest_rate = data.reduce(
      (sum: number, obj: any) =>
        sum + Number(obj.interest_rate),
      0
    );
    this.tot_arrears = data.reduce(
      (sum: number, obj: any) =>
        sum + Number(obj.arrears),
      0
    );
    this.tot_approved_amount = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.approved_amount),
      0
    );
    this.tot_overdrawn_balance = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.overdrawn_balance),
      0
    );
    this.tot_difference = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.difference),
      0
    );
    this.tot_penality_charge_collection = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.penality_charge_collection),
      0
    );
  }
}
