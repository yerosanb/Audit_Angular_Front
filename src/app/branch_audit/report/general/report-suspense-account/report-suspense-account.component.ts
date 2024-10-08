import { Component, OnInit } from '@angular/core';
import { Branches } from 'app/models/admin/branches';
import { Region } from 'app/models/admin/region';
import { ExportExcelService } from 'app/services/shared/export-excel.service';
import { StorageService } from 'app/services/shared/storage.service';
import { MessageService } from 'primeng/api';
import { BranchReportAbnormalBalance } from '../../payloads/Abnormal Balance/BranchReportAbnormalBalance';
import { ReportByAuditFindingAbnormalBalance } from '../../payloads/Abnormal Balance/report_by_audit_finding_abnormal_balance';
import { ReportByBranchNameAbnormalBalance } from '../../payloads/Abnormal Balance/report_by_branch_name_abnormal_balance';
import { ReportByDateRangeAbnormalBalance } from '../../payloads/Abnormal Balance/report_by_date_range_abnormal_balance';
import { ReportByFindingStatusAbnormalBalance } from '../../payloads/Abnormal Balance/report_by_finding_status_abnormal_balance';
import { ReportByGeneralAbnormalBalance } from '../../payloads/Abnormal Balance/report_by_general_abnormal_balance';
import { ReportByRectificationDateAbnormalBalance } from '../../payloads/Abnormal Balance/report_by_rectification_date_abnormal_balance';
import { ReportByRegionAbnormalBalance } from '../../payloads/Abnormal Balance/report_by_region_abnormal_balance';
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
import { BranchReportSuspenseAccount } from '../../payloads/Suspense Account/BranchReportSuspenseAccount';
import { ReportByAmountAbnormalBalance } from '../../payloads/Abnormal Balance/report_by_amount_abnormal_balance';
import { ReportByAuditFindingSuspenseAccount } from '../../payloads/Suspense Account/report_by_audit_finding_suspense_account';
import { ReportByBranchNameSuspenseAccount } from '../../payloads/Suspense Account/report_by_branch_name_suspense_account';
import { ReportByDateRangeSuspenseAccount } from '../../payloads/Suspense Account/report_by_date_range_suspense_account';
import { ReportByAmountSuspenseAccount } from '../../payloads/Suspense Account/report_by_amount_suspense_account';
import { ReportByFindingStatusSuspenseAccount } from '../../payloads/Suspense Account/report_by_finding_status_suspense_account';
import { ReportByGeneralSuspenseAccount } from '../../payloads/Suspense Account/report_by_general_suspense_account';
import { ReportByRectificationDateSuspenseAccount } from '../../payloads/Suspense Account/report_by_rectification_date_suspense_account';
import { ReportByRegionSuspenseAccount } from '../../payloads/Suspense Account/report_by_region_suspense_account';
import { ReportByAuditPeriodSuspenseAccount } from '../../payloads/Suspense Account/report_by_audit_period_suspense_account';

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
  selector: 'app-report-suspense-account',
  templateUrl: './report-suspense-account.component.html',
  styleUrls: ['./report-suspense-account.component.css'],
})
export class ReportSuspenseAccountComponent implements OnInit {
  maxDate: Date;
  visibled: boolean = false;
  newFinding: string;
  filter_spinner: boolean = false;

  regionOptions: Region[] = [];
  suspenseAccountTypeOptions: Branches[] = [];
  auditFindingOptions: FindingsR[] = [];
  auditFindingOption: FindingsR;
  branchOptions: BranchesR[] = [];
  branchHolder: BranchesR[] = [];
  branch_report = new BranchReportSuspenseAccount();
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
  ingOptions: any[];
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
    this.getSuspenseAccountTypeOptions();
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

  newFindingDialog() {
    this.visibled = true;
  }

  minValueForMax1 = 0;
  minValueForMax2 = 0;
  updateMaxValue() {
    if (this.branch_report.balance_per_tracer_min != undefined)
      this.minValueForMax1 = this.branch_report.balance_per_tracer_min;
    if (this.branch_report.balance_per_trial_balance_min != undefined)
      this.minValueForMax2 = this.branch_report.balance_per_trial_balance_min;
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
    this.branch_report_service.getFindings('SuspenseAccount').subscribe({
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

  getSuspenseAccountTypeOptions() {
    this.branch_report_service.getSuspenseAccountTypeOptions().subscribe({
      next: (data) => {
        this.suspenseAccountTypeOptions = data;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong while fetching suspense account types!',
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
      'audit_report_date',
      'branch_name',
      'audit_finding',
      'difference',
      // 'tracer_date',
      'balance_per_tracer',
      'balance_per_trial_balance',
      'audit_impact',
      'auditor_recommendation',
      'auditee_response',
      'audit_finding_status',
      'rectified_on',
      'case_number',
      'audit_period',
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

  exportDataColumns_ReportByBranchName: ReportByBranchNameSuspenseAccount[] =
    [];
  exportDataColumns_ReportByAuditPeriod: ReportByAuditPeriodSuspenseAccount[] =
    [];
  exportDataColumns_ReportByRegion: ReportByRegionSuspenseAccount[] = [];
  exportDataColumns_ReportByAmount: ReportByAmountSuspenseAccount[] = [];
  exportDataColumns_ReportByFindingStatus: ReportByFindingStatusSuspenseAccount[] =
    [];
  exportDataColumns_ReportByRectificationDate: ReportByRectificationDateSuspenseAccount[] =
    [];
  exportDataColumns_ReportByAuditFinding: ReportByAuditFindingSuspenseAccount[] =
    [];
  exportDataColumns_ReportByDateRange: ReportByDateRangeSuspenseAccount[] = [];
  exportDataColumns_ReportByGeneral: ReportByGeneralSuspenseAccount[] = [];

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

    let ReportByAmount_: ReportByAmountSuspenseAccount = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      difference: undefined,
      tracer_date: undefined,
      balance_per_tracer: undefined,
      balance_per_trial_balance: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByAuditFinding_: ReportByAuditFindingSuspenseAccount = {
      branch_name: undefined,
      audit_finding: undefined,
      difference: undefined,
      tracer_date: undefined,
      balance_per_tracer: undefined,
      balance_per_trial_balance: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByAuditPeriod_: ReportByAuditPeriodSuspenseAccount = {
      case_number: undefined,
      audit_period: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      difference: undefined,
      tracer_date: undefined,
      balance_per_tracer: undefined,
      balance_per_trial_balance: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByBranchName_: ReportByBranchNameSuspenseAccount = {
      case_number: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      difference: undefined,
      tracer_date: undefined,
      balance_per_tracer: undefined,
      balance_per_trial_balance: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByRegion_: ReportByRegionSuspenseAccount = {
      region_name: undefined,
      audit_finding: undefined,
      difference: undefined,
      tracer_date: undefined,
      balance_per_tracer: undefined,
      balance_per_trial_balance: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByDateRange_: ReportByDateRangeSuspenseAccount = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      difference: undefined,
      tracer_date: undefined,
      balance_per_tracer: undefined,
      balance_per_trial_balance: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByFindingStatus_: ReportByFindingStatusSuspenseAccount = {
      branch_name: undefined,
      audit_finding: undefined,
      difference: undefined,
      tracer_date: undefined,
      balance_per_tracer: undefined,
      balance_per_trial_balance: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByGeneral_: ReportByGeneralSuspenseAccount = {
      audit_report_date: undefined,
      case_number: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      difference: undefined,
      tracer_date: undefined,
      balance_per_tracer: undefined,
      balance_per_trial_balance: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByRectificationDate_: ReportByRectificationDateSuspenseAccount = {
      branch_name: undefined,
      audit_finding: undefined,
      difference: undefined,
      tracer_date: undefined,
      balance_per_tracer: undefined,
      balance_per_trial_balance: undefined,
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
          'AFRFMS - Suspense Accounts Report by branch name'
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
          'AFRFMS - Suspense Accounts Report by region'
        );
      } else if (this.selectedReportType == 'amount') {
        this.exportReport_excel(
          'amount',
          ReportByAmount_,
          this.exportDataColumns_ReportByAmount,
          'Findings Report',
          'AFRFMS - Suspense Accounts Report by amount'
        );
      } else if (this.selectedReportType == 'finding_status') {
        this.exportReport_excel(
          'finding_status',
          ReportByFindingStatus_,
          this.exportDataColumns_ReportByFindingStatus,
          'Findings Report',
          'AFRFMS - Suspense Accounts Report by finding status'
        );
      } else if (this.selectedReportType == 'rectification_date_range') {
        this.exportReport_excel(
          'rectification_date_range',
          ReportByRectificationDate_,
          this.exportDataColumns_ReportByRectificationDate,
          'Findings Report',
          'AFRFMS - Suspense Accounts Report by rectification status'
        );
      } else if (this.selectedReportType == 'audit_finding') {
        this.exportReport_excel(
          'audit_finding',
          ReportByAuditFinding_,
          this.exportDataColumns_ReportByAuditFinding,
          'Findings Report',
          'AFRFMS - Suspense Accounts Report by audit finding'
        );
      } else if (this.selectedReportType == 'date_range') {
        this.exportReport_excel(
          'date_range',
          ReportByDateRange_,
          this.exportDataColumns_ReportByDateRange,
          'Findings Report',
          'AFRFMS - Suspense Accounts Report by Date of Discrepancy'
        );
      } else {
        this.exportReport_excel(
          'general',
          ReportByGeneral_,
          this.exportDataColumns_ReportByGeneral,
          'Findings Report',
          'AFRFMS - Suspense Accounts Report'
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
    {
      this.branch_report.tracer_date_range == null
        ? (this.branch_report.tracer_date_range = ['', ''])
        : undefined;
    }
    {
      this.branch_report.suspense_account_type = this.branch_report
        .suspense_account_type
        ? this.suspenseAccountTypeOptions.find(
            (region) => region.id === this.branch_report.suspense_account_type
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
      // if (
      //   this.branch_report.debit_amount_max !== undefined &&
      //   this.branch_report.debit_amount_max !== null
      // )
      //   undefinedProperties.push('debit_amount_max');
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
      if (
        (this.branch_report.balance_per_tracer_min !== undefined &&
          this.branch_report.balance_per_tracer_min !== null) ||
        (this.branch_report.balance_per_tracer_max !== undefined &&
          this.branch_report.balance_per_tracer_max !== null) ||
        (this.branch_report.balance_per_trial_balance_min !== undefined &&
          this.branch_report.balance_per_trial_balance_min !== null) ||
        (this.branch_report.balance_per_trial_balance_max !== undefined &&
          this.branch_report.balance_per_trial_balance_max !== null)
      )
        undefinedProperties.push('amount');
      if (
        this.branch_report.tracer_date_range[0] != '' ||
        this.branch_report.tracer_date_range[1] != ''
      )
        undefinedProperties.push('tracer_date_range');
      if (
        this.branch_report.suspense_account_type !== undefined &&
        this.branch_report.suspense_account_type !== null
      )
        undefinedProperties.push('suspense_account_type');
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
      .fetchReportSuspenseAccount(this.branch_report)
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
      this.cols = ReportByBranchNameSuspenseAccount.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Suspense Accounts Report by branch name';
    } else if (this.branch_report.single_filter_info == 'region') {
      this.cols = ReportByRegionSuspenseAccount.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Suspense Accounts Report by region';
    } else if (this.branch_report.single_filter_info == 'finding_status') {
      this.cols = ReportByFindingStatusSuspenseAccount.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Suspense Accounts Report by finding status';
    } else if (
      this.branch_report.single_filter_info == 'rectification_date_range'
    ) {
      this.cols = ReportByRectificationDateSuspenseAccount.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Suspense Accounts Report by rectification date';
    } else if (this.branch_report.single_filter_info == 'audit_finding') {
      this.cols = ReportByAuditFindingSuspenseAccount.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Suspense Accounts Report by audit finding';
    } else if (this.branch_report.single_filter_info == 'date_range') {
      this.cols = ReportByDateRangeSuspenseAccount.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Suspense Accounts Report by Date of Discrepancy';
    } else if (this.branch_report.single_filter_info == 'amount') {
      this.cols = ReportByAmountSuspenseAccount.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Suspense Accounts Report by amount';
    } else {
      this.cols = ReportByGeneralSuspenseAccount.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport = 'AFRFMS - Suspense Accounts Report';
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
        this.branch_report.tracer_date_range != undefined &&
        this.branch_report.tracer_date_range[0] == '' &&
        this.branch_report.tracer_date_range[1] == ''
      )
        this.branch_report.tracer_date_range = undefined;

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

  tot_difference: number = 0;
  tot_balance_per_tracer: number = 0;
  tot_balance_per_trial_balance: number = 0;

  calculate_totals(data: any) {
    this.tot_difference = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.difference),
      0
    );
    this.tot_balance_per_tracer = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.balance_per_tracer),
      0
    );
    this.tot_balance_per_trial_balance = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.balance_per_trial_balance),
      0
    );
  }
}
