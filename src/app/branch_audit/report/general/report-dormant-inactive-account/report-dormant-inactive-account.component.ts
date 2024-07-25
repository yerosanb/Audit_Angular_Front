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
import { BranchReportDormantInactiveAccount } from '../../payloads/Dormant Inactive Account/BranchReportDormantInactiveAccount';
import { ReportByAuditFindingDormantInactiveAccount } from '../../payloads/Dormant Inactive Account/report_by_audit_finding_dormant_inactive_account';
import { ReportByBranchNameDormantInactiveAccount } from '../../payloads/Dormant Inactive Account/report_by_branch_name_dormant_inactive_account';
import { ReportByDateRangeDormantInactiveAccount } from '../../payloads/Dormant Inactive Account/report_by_date_range_dormant_inactive_account';
import { ReportByFindingStatusDormantInactiveAccount } from '../../payloads/Dormant Inactive Account/report_by_finding_status_dormant_inactive_account';
import { ReportByGeneralDormantInactiveAccount } from '../../payloads/Dormant Inactive Account/report_by_general_dormant_inactive_account';
import { ReportByRectificationDateDormantInactiveAccount } from '../../payloads/Dormant Inactive Account/report_by_rectification_date_dormant_inactive_account';
import { ReportByRegionDormantInactiveAccount } from '../../payloads/Dormant Inactive Account/report_by_region_dormant_inactive_account';
import { ReportByAuditPeriodDormantInactiveAccount } from '../../payloads/Dormant Inactive Account/report_by_audit_period_dormant_inactive_account';
import { ReportByAmountDormantInactiveAccount } from '../../payloads/Dormant Inactive Account/report_by_amount_dormant_inactive_account';

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
  selector: 'app-report-dormant-inactive-account',
  templateUrl: './report-dormant-inactive-account.component.html',
  styleUrls: ['./report-dormant-inactive-account.component.css'],
})
export class ReportDormantInactiveAccountComponent implements OnInit {
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
  branch_report = new BranchReportDormantInactiveAccount();
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

  minValueForMax = 0;
  updateMaxValue() {
    if (this.branch_report.amount_min != undefined)
      this.minValueForMax = this.branch_report.amount_min;
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
    this.branch_report_service.getFindings('DormantActiveAccount').subscribe({
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
      'audit_report_date',
      'branch_name',
      'audit_finding',
      // 'account_number',
      // 'deactivated_date',
      'amount',
      // 'entry_passed_by',
      // 'entry_approved_by',
      // 'account_type',
      'audit_impact',
      'auditor_recommendation',
      'auditee_response',
      'audit_finding_status',
      'rectified_on',
      'case_number',
      'audit_period',
      'region_name',
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

  exportDataColumns_ReportByBranchName: ReportByBranchNameDormantInactiveAccount[] =
    [];
  exportDataColumns_ReportByAuditPeriod: ReportByAuditPeriodDormantInactiveAccount[] =
    [];
  exportDataColumns_ReportByRegion: ReportByRegionDormantInactiveAccount[] = [];
  exportDataColumns_ReportByAmount: ReportByAmountDormantInactiveAccount[] = [];
  exportDataColumns_ReportByFindingStatus: ReportByFindingStatusDormantInactiveAccount[] =
    [];
  exportDataColumns_ReportByRectificationDate: ReportByRectificationDateDormantInactiveAccount[] =
    [];
  exportDataColumns_ReportByAuditFinding: ReportByAuditFindingDormantInactiveAccount[] =
    [];
  exportDataColumns_ReportByDateRange: ReportByDateRangeDormantInactiveAccount[] =
    [];
  exportDataColumns_ReportByGeneral: ReportByGeneralDormantInactiveAccount[] =
    [];

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

    let ReportByAmount_: ReportByAmountDormantInactiveAccount = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      account_number: undefined,
      account_name: undefined,
      deactivated_date: undefined,
      amount: undefined,
      entry_passed_by: undefined,
      entry_approved_by: undefined,
      account_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByAuditFinding_: ReportByAuditFindingDormantInactiveAccount = {
      branch_name: undefined,
      audit_finding: undefined,
      account_number: undefined,
      account_name: undefined,
      deactivated_date: undefined,
      amount: undefined,
      entry_passed_by: undefined,
      entry_approved_by: undefined,
      account_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByAuditPeriod_: ReportByAuditPeriodDormantInactiveAccount = {
      case_number: undefined,
      audit_period: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      account_number: undefined,
      account_name: undefined,
      deactivated_date: undefined,
      amount: undefined,
      entry_passed_by: undefined,
      entry_approved_by: undefined,
      account_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByBranchName_: ReportByBranchNameDormantInactiveAccount = {
      case_number: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      account_number: undefined,
      account_name: undefined,
      deactivated_date: undefined,
      amount: undefined,
      entry_passed_by: undefined,
      entry_approved_by: undefined,
      account_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByDateRange_: ReportByDateRangeDormantInactiveAccount = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      account_number: undefined,
      account_name: undefined,
      deactivated_date: undefined,
      amount: undefined,
      entry_passed_by: undefined,
      entry_approved_by: undefined,
      account_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByFindingStatus_: ReportByFindingStatusDormantInactiveAccount = {
      branch_name: undefined,
      audit_finding: undefined,
      account_number: undefined,
      account_name: undefined,
      deactivated_date: undefined,
      amount: undefined,
      entry_passed_by: undefined,
      entry_approved_by: undefined,
      account_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    let ReportByGeneral_: ReportByGeneralDormantInactiveAccount = {
      audit_report_date: undefined,
      case_number: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      account_number: undefined,
      account_name: undefined,
      deactivated_date: undefined,
      amount: undefined,
      entry_passed_by: undefined,
      entry_approved_by: undefined,
      account_type: undefined,
      rectified_on: undefined,
    };

    let ReportByRectificationDate_: ReportByRectificationDateDormantInactiveAccount =
      {
        branch_name: undefined,
        audit_finding: undefined,
        account_number: undefined,
        account_name: undefined,
        deactivated_date: undefined,
        amount: undefined,
        entry_passed_by: undefined,
        entry_approved_by: undefined,
        account_type: undefined,
        audit_impact: undefined,
        auditor_recommendation: undefined,
        auditee_response: undefined,
        audit_finding_status: undefined,
        rectified_on: undefined,
      };

    let ReportByRegion_: ReportByRegionDormantInactiveAccount = {
      region_name: undefined,
      audit_finding: undefined,
      account_number: undefined,
      account_name: undefined,
      deactivated_date: undefined,
      amount: undefined,
      entry_passed_by: undefined,
      entry_approved_by: undefined,
      account_type: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };

    {
      if (this.selectedReportType == 'branch') {
        this.exportReport_excel(
          'branch',
          ReportByBranchName_,
          this.exportDataColumns_ReportByBranchName,
          'Findings Report',
          'AFRFMS - Dormant/Inactive Account Report by branch name'
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
          'AFRFMS - Dormant/Inactive Account Report by region'
        );
      } else if (this.selectedReportType == 'amount') {
        this.exportReport_excel(
          'amount',
          ReportByAmount_,
          this.exportDataColumns_ReportByAmount,
          'Findings Report',
          'AFRFMS - Dormant/Inactive Account Report by amount'
        );
      } else if (this.selectedReportType == 'finding_status') {
        this.exportReport_excel(
          'finding_status',
          ReportByFindingStatus_,
          this.exportDataColumns_ReportByFindingStatus,
          'Findings Report',
          'AFRFMS - Dormant/Inactive Account Report by finding status'
        );
      } else if (this.selectedReportType == 'rectification_date_range') {
        this.exportReport_excel(
          'rectification_date_range',
          ReportByRectificationDate_,
          this.exportDataColumns_ReportByRectificationDate,
          'Findings Report',
          'AFRFMS - Dormant/Inactive Account Report by rectification date'
        );
      } else if (this.selectedReportType == 'audit_finding') {
        this.exportReport_excel(
          'audit_finding',
          ReportByAuditFinding_,
          this.exportDataColumns_ReportByAuditFinding,
          'Findings Report',
          'AFRFMS - Dormant/Inactive Account Report by audit finding'
        );
      } else if (this.selectedReportType == 'date_range') {
        this.exportReport_excel(
          'date_range',
          ReportByDateRange_,
          this.exportDataColumns_ReportByDateRange,
          'Findings Report',
          'AFRFMS - Dormant/Inactive Account Report by Date of Discrepancy'
        );
      } else {
        this.exportReport_excel(
          'general',
          ReportByGeneral_,
          this.exportDataColumns_ReportByGeneral,
          'Findings Report',
          'AFRFMS - Dormant/Inactive Account Report'
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
        (this.branch_report.amount_min !== undefined &&
          this.branch_report.amount_min !== null) ||
        (this.branch_report.amount_min !== undefined &&
          this.branch_report.amount_min !== null)
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
      if (
        this.branch_report.account_number !== undefined &&
        this.branch_report.account_number !== null &&
        this.branch_report.account_number != ''
      )
        undefinedProperties.push('account_number');
      if (
        this.branch_report.account_type !== undefined &&
        this.branch_report.account_type !== null &&
        this.branch_report.account_type != ''
      )
        undefinedProperties.push('account_type');
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
      .fetchReportDormantInactiveAccount(this.branch_report)
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
      this.cols = ReportByBranchNameDormantInactiveAccount.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Dormant/Inactive Account Report by branch name';
    } else if (this.branch_report.single_filter_info == 'region') {
      this.cols = ReportByRegionDormantInactiveAccount.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Dormant/Inactive Account Report by region';
    } else if (this.branch_report.single_filter_info == 'finding_status') {
      this.cols = ReportByFindingStatusDormantInactiveAccount.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Dormant/Inactive Account Report by finding status';
    } else if (
      this.branch_report.single_filter_info == 'rectification_date_range'
    ) {
      this.cols = ReportByRectificationDateDormantInactiveAccount.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Dormant/Inactive Account Report by rectification date';
    } else if (this.branch_report.single_filter_info == 'audit_finding') {
      this.cols = ReportByAuditFindingDormantInactiveAccount.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Dormant/Inactive Account Report by audit finding';
    } else if (this.branch_report.single_filter_info == 'date_range') {
      this.cols = ReportByDateRangeDormantInactiveAccount.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Dormant/Inactive Account Report by Date of Discrepancy';
    } else if (this.branch_report.single_filter_info == 'amount') {
      this.cols = ReportByAmountDormantInactiveAccount.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Dormant/Inactive Account Report by amount';
    } else {
      this.cols = ReportByGeneralDormantInactiveAccount.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport = 'AFRFMS - Dormant/Inactive Account Report';
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

  tot_amount: number = 0;

  calculate_totals(data: any) {
    this.tot_amount = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.amount),
      0
    );
  }
}
