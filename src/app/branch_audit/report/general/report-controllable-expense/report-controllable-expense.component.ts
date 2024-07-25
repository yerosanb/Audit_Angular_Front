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
import { BranchReportControllableExpense } from '../../payloads/Controllable Expense/BranchReportControllableExpense';
import { ReportByAuditFindingControllableExpense } from '../../payloads/Controllable Expense/report_by_audit_finding_controllable_expense';
import { ReportByBranchNameControllableExpense } from '../../payloads/Controllable Expense/report_by_branch_name_controllable_expense';
import { ReportByDateRangeControllableExpense } from '../../payloads/Controllable Expense/report_by_date_range_controllable_expense';
import { ReportByFindingStatusControllableExpense } from '../../payloads/Controllable Expense/report_by_finding_status_controllable_expense';
import { ReportByGeneralControllableExpense } from '../../payloads/Controllable Expense/report_by_general_controllable_expense';
import { ReportByRectificationDateControllableExpense } from '../../payloads/Controllable Expense/report_by_rectification_date_controllable_expense';
import { ReportByRegionControllableExpense } from '../../payloads/Controllable Expense/report_by_region_controllable_expense';
import { ReportByAmountControllableExpense } from '../../payloads/Controllable Expense/report_by_amount_controllable_expense';
import { ReportByAuditPeriodControllableExpense } from '../../payloads/Controllable Expense/report_by_audit_period_controllable_expense';
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
  selector: 'app-report-controllable-expense',
  templateUrl: './report-controllable-expense.component.html',
  styleUrls: ['./report-controllable-expense.component.css'],
})
export class ReportControllableExpenseComponent implements OnInit {
  maxDate: Date;
  visibled: boolean = false;
  newFinding: string;
  filter_spinner: boolean = false;

  regionOptions: Region[] = [];
  controllableExpenseType: Branches[] = [];
  auditFindingOptions: FindingsR[] = [];
  auditFindingOption: FindingsR;
  branchOptions: BranchesR[] = [];
  branchHolder: BranchesR[] = [];
  branch_report = new BranchReportControllableExpense();
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
    this.getControllableExpenseTypes();
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
  minValueForMax3 = 0;
  updateMaxValue() {
    if (this.branch_report.variation_min != undefined)
      this.minValueForMax1 = this.branch_report.variation_min;
    if (this.branch_report.budget_per_plan_min != undefined)
      this.minValueForMax2 = this.branch_report.budget_per_plan_min;
    if (this.branch_report.actual_balance_min != undefined)
      this.minValueForMax3 = this.branch_report.actual_balance_min;
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
    this.branch_report_service.getFindings('ControllableExpense').subscribe({
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

  getControllableExpenseTypes() {
    this.branch_report_service.getControllableExpenseTypes().subscribe({
      next: (data) => {
        this.controllableExpenseType = data;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            'Something went wrong while fetching controllable expense types!',
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
      'variation',
      // 'period',
      'budget_per_plan',
      'actual_balance',
      'audit_impact',
      'auditor_recommendation',
      'auditee_response',
      'audit_finding_status',
      'rectified_on',
      'branch_name',
      'audit_report_date',
      'case_number',
      'audit_period',
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

  exportDataColumns_ReportByBranchName: ReportByBranchNameControllableExpense[] =
    [];
  exportDataColumns_ReportByAuditPeriod: ReportByAuditPeriodControllableExpense[] =
    [];
  exportDataColumns_ReportByRegion: ReportByRegionControllableExpense[] = [];
  exportDataColumns_ReportByAmount: ReportByAmountControllableExpense[] = [];
  exportDataColumns_ReportByFindingStatus: ReportByFindingStatusControllableExpense[] =
    [];
  exportDataColumns_ReportByRectificationDate: ReportByRectificationDateControllableExpense[] =
    [];
  exportDataColumns_ReportByAuditFinding: ReportByAuditFindingControllableExpense[] =
    [];
  exportDataColumns_ReportByDateRange: ReportByDateRangeControllableExpense[] =
    [];
  exportDataColumns_ReportByGeneral: ReportByGeneralControllableExpense[] = [];

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
    let ReportByRegion_: ReportByRegionControllableExpense = {
      region_name: undefined,
      audit_finding: undefined,
      variation: undefined,
      period: undefined,
      budget_per_plan: undefined,
      actual_balance: undefined,
      expense_type: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByRectificationDate_: ReportByRectificationDateControllableExpense =
      {
        branch_name: undefined,
        audit_finding: undefined,
        variation: undefined,
        period: undefined,
        budget_per_plan: undefined,
        actual_balance: undefined,
        expense_type: undefined,

        audit_impact: undefined,
        auditor_recommendation: undefined,
        auditee_response: undefined,
        audit_finding_status: undefined,
        rectified_on: undefined,
        cash_type: undefined,
      };

    let ReportByGeneral_: ReportByGeneralControllableExpense = {
      audit_report_date: undefined,
      case_number: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      variation: undefined,
      period: undefined,
      budget_per_plan: undefined,
      actual_balance: undefined,
      expense_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByFindingStatus_: ReportByFindingStatusControllableExpense = {
      branch_name: undefined,
      audit_finding: undefined,
      variation: undefined,
      period: undefined,
      budget_per_plan: undefined,
      actual_balance: undefined,
      expense_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByAmount_: ReportByAmountControllableExpense = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      variation: undefined,
      period: undefined,
      budget_per_plan: undefined,
      actual_balance: undefined,
      expense_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByDateRange_: ReportByDateRangeControllableExpense = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      variation: undefined,
      period: undefined,
      budget_per_plan: undefined,
      actual_balance: undefined,
      expense_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByBranchName_: ReportByBranchNameControllableExpense = {
      case_number: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      variation: undefined,
      period: undefined,
      budget_per_plan: undefined,
      actual_balance: undefined,
      expense_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByAuditPeriod_: ReportByAuditPeriodControllableExpense = {
      case_number: undefined,
      audit_period: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      variation: undefined,
      period: undefined,
      budget_per_plan: undefined,
      actual_balance: undefined,
      expense_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByAuditFinding_: ReportByAuditFindingControllableExpense = {
      branch_name: undefined,
      audit_finding: undefined,
      variation: undefined,
      period: undefined,
      budget_per_plan: undefined,
      actual_balance: undefined,
      expense_type: undefined,
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
          'AFRFMS - Expenses-related findings Report by branch'
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
          'AFRFMS - Expenses-related findings Report by region'
        );
      } else if (this.selectedReportType == 'amount') {
        this.exportReport_excel(
          'amount',
          ReportByAmount_,
          this.exportDataColumns_ReportByAmount,
          'Findings Report',
          'AFRFMS - Expenses-related findings Report by amount'
        );
      } else if (this.selectedReportType == 'finding_status') {
        this.exportReport_excel(
          'finding_status',
          ReportByFindingStatus_,
          this.exportDataColumns_ReportByFindingStatus,
          'Findings Report',
          'AFRFMS - Expenses-related findings Report by finding status'
        );
      } else if (this.selectedReportType == 'rectification_date_range') {
        this.exportReport_excel(
          'rectification_date_range',
          ReportByRectificationDate_,
          this.exportDataColumns_ReportByRectificationDate,
          'Findings Report',
          'AFRFMS - Expenses-related findings Report by rectification date'
        );
      } else if (this.selectedReportType == 'audit_finding') {
        this.exportReport_excel(
          'audit_finding',
          ReportByAuditFinding_,
          this.exportDataColumns_ReportByAuditFinding,
          'Findings Report',
          'AFRFMS - Expenses-related findings Report by audit finding'
        );
      } else if (this.selectedReportType == 'date_range') {
        this.exportReport_excel(
          'date_range',
          ReportByDateRange_,
          this.exportDataColumns_ReportByDateRange,
          'Findings Report',
          'AFRFMS - Expenses-related findings Report by Date of Discrepancy'
        );
      } else {
        this.exportReport_excel(
          'general',
          ReportByGeneral_,
          this.exportDataColumns_ReportByGeneral,
          'Findings Report',
          'AFRFMS - Expenses-related findings Report'
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
    this.minValueForMax3 = 0;
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
      this.branch_report.category_of_discrepancy = this.branch_report
        .category_of_discrepancy
        ? this.controllableExpenseType.find(
            (type) => type.id === this.branch_report.category_of_discrepancy
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
        (this.branch_report.variation_min !== undefined &&
          this.branch_report.variation_min !== null) ||
        (this.branch_report.variation_max !== undefined &&
          this.branch_report.variation_max !== null) ||
        (this.branch_report.budget_per_plan_min !== undefined &&
          this.branch_report.budget_per_plan_min !== null) ||
        (this.branch_report.budget_per_plan_max !== undefined &&
          this.branch_report.budget_per_plan_max !== null) ||
        (this.branch_report.actual_balance_min !== undefined &&
          this.branch_report.actual_balance_min !== null) ||
        (this.branch_report.actual_balance_max !== undefined &&
          this.branch_report.actual_balance_max !== null)
      )
        undefinedProperties.push('amount');
      // if (
      //   this.branch_report.debit_amount_min !== undefined &&
      //   this.branch_report.debit_amount_min !== null
      // )
      //   undefinedProperties.push('debit_amount_min');
      // if (
      //   this.branch_report.credit_amount_max !== undefined &&
      //   this.branch_report.credit_amount_max !== null
      // )
      //   undefinedProperties.push('credit_amount_max');
      // if (
      //   this.branch_report.account_affected !== undefined &&
      //   this.branch_report.account_affected !== null &&
      //   this.branch_report.account_affected.trim() !== ''
      // )
      //   undefinedProperties.push('account_affected');
      // if (
      //   this.branch_report.credit_amount_min !== undefined &&
      //   this.branch_report.credit_amount_min !== null
      // )
      //   undefinedProperties.push('credit_amount_min');
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
      .fetchReportControllableExpense(this.branch_report)
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
      this.cols = ReportByBranchNameControllableExpense.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Expenses-related findings Report by branch';
    } else if (this.branch_report.single_filter_info == 'region') {
      this.cols = ReportByRegionControllableExpense.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Expenses-related findings Report by region';
    } else if (this.branch_report.single_filter_info == 'finding_status') {
      this.cols = ReportByFindingStatusControllableExpense.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Expenses-related findings Report by finding status';
    } else if (
      this.branch_report.single_filter_info == 'rectification_date_range'
    ) {
      this.cols = ReportByRectificationDateControllableExpense.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Expenses-related findings Report by rectification date';
    } else if (this.branch_report.single_filter_info == 'audit_finding') {
      this.cols = ReportByAuditFindingControllableExpense.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Expenses-related findings Report by audit finding';
    } else if (this.branch_report.single_filter_info == 'date_range') {
      this.cols = ReportByDateRangeControllableExpense.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Expenses-related findings Report by Date of Discrepancy';
    } else if (this.branch_report.single_filter_info == 'amount') {
      this.cols = ReportByAmountControllableExpense.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Expenses-related findings Report by amount';
    } else {
      this.cols = ReportByGeneralControllableExpense.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport = 'AFRFMS - Expenses-related findings Report';
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
  tot_variation: number = 0;
  tot_budget_per_plan: number = 0;
  tot_actual_balance: number = 0;

  calculate_totals(data: any) {
    this.tot_variation = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.variation),
      0
    );
    this.tot_budget_per_plan = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.budget_per_plan),
      0
    );
    this.tot_actual_balance = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.actual_balance),
      0
    );
  }
}
