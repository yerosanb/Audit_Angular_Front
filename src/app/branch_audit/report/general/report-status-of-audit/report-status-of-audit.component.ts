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
import { ReportByAmountAbnormalBalance } from '../../payloads/Abnormal Balance/report_by_amount_abnormal_balance';
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
  selector: 'app-report-status-of-audit',
  templateUrl: './report-status-of-audit.component.html',
  styleUrls: ['./report-status-of-audit.component.css'],
})
export class ReportStatusOfAuditComponent implements OnInit {
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
  branch_report = new BranchReportAbnormalBalance();
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

  minValueForMax1 = 0;
  minValueForMax2 = 0;
  updateMaxValue() {
    if (this.branch_report.debit_amount_min != undefined)
      this.minValueForMax1 = this.branch_report.debit_amount_min;
    if (this.branch_report.credit_amount_min != undefined)
      this.minValueForMax2 = this.branch_report.credit_amount_min;
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
    this.branch_report_service.getFindings('StatusOfAudit').subscribe({
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
      'audit_finding',
      'auditor_recommendation',
      'audit_impact',
      'auditee_response',
      'branch_name',
      'case_number',
      'audit_finding_status',
      'audit_report_date',
      // 'rectified_on',
      // 'card_issued_branch',
      // 'card_distributed_to_customer',
      // 'return_to_card_issuance_unit',
      // 'remaining_card_at_branch ',
    ];

    this.exportService.exportPdf(
      this.exportColumns.filter((pair) =>
        pdf_allowed_columns.includes(pair.dataKey)
      ),
      this.reportResponse,
      'AFRFMS - Findings Report',
      'AFRFMS - Findings Report'
    );
  }

  exportDataColumns_ReportByBranchName: ReportByBranchName[] = [];
  exportDataColumns_ReportByAuditPeriod: ReportByAuditPeriod[] = [];
  exportDataColumns_ReportByRegion: ReportByRegion[] = [];
  exportDataColumns_ReportByFindingStatus: ReportByFindingStatus[] = [];
  exportDataColumns_ReportByRectificationDate: ReportByRectificationDate[] = [];
  exportDataColumns_ReportByAuditFinding: ReportByAuditFinding[] = [];
  exportDataColumns_ReportByDateRange: ReportByDateRange[] = [];
  exportDataColumns_ReportByGeneral: ReportByGeneral[] = [];

  exportExcel() {
    this.exportDataColumns_ReportByBranchName = [];
    this.exportDataColumns_ReportByAuditPeriod = [];
    this.exportDataColumns_ReportByRegion = [];
    this.exportDataColumns_ReportByFindingStatus = [];
    this.exportDataColumns_ReportByRectificationDate = [];
    this.exportDataColumns_ReportByAuditFinding = [];
    this.exportDataColumns_ReportByDateRange = [];
    this.exportDataColumns_ReportByGeneral = [];

    let ReportByRegion_: ReportByRegion = {
      region_name: undefined,
      audit_finding: undefined,
      card_issued_branch: undefined,
      card_distributed_to_customer: undefined,
      return_to_card_issuance_unit: undefined,
      remaining_card_at_branch: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByBranchName_: ReportByBranchName = {
      branch_name: undefined,
      audit_finding: undefined,
      card_issued_branch: undefined,
      card_distributed_to_customer: undefined,
      return_to_card_issuance_unit: undefined,
      remaining_card_at_branch: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByAuditPeriod_: ReportByAuditPeriod = {
      audit_period: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      card_issued_branch: undefined,
      card_distributed_to_customer: undefined,
      return_to_card_issuance_unit: undefined,
      remaining_card_at_branch: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByFindingStatus_: ReportByFindingStatus = {
      branch_name: undefined,
      audit_finding: undefined,
      card_issued_branch: undefined,
      card_distributed_to_customer: undefined,
      return_to_card_issuance_unit: undefined,
      remaining_card_at_branch: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByRectificationDate_: ReportByRectificationDate = {
      branch_name: undefined,
      audit_finding: undefined,
      card_issued_branch: undefined,
      card_distributed_to_customer: undefined,
      return_to_card_issuance_unit: undefined,
      remaining_card_at_branch: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByAuditFinding_: ReportByAuditFinding = {
      branch_name: undefined,
      audit_finding: undefined,
      card_issued_branch: undefined,
      card_distributed_to_customer: undefined,
      return_to_card_issuance_unit: undefined,
      remaining_card_at_branch: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByDateRange_: ReportByDateRange = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      card_issued_branch: undefined,
      card_distributed_to_customer: undefined,
      return_to_card_issuance_unit: undefined,
      remaining_card_at_branch: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
    };
    let ReportByGeneral_: ReportByGeneral = {
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      card_issued_branch: undefined,
      card_distributed_to_customer: undefined,
      return_to_card_issuance_unit: undefined,
      remaining_card_at_branch: undefined,
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
        'AFRFMS - Findings Report'
      );
    } else if (this.selectedReportType == 'audit_report') {
      this.exportReport_excel(
        'audit_report',
        ReportByAuditPeriod_,
        this.exportDataColumns_ReportByAuditPeriod,
        'Findings Report',
        'AFRFMS - Findings Report'
      );
    } else if (this.selectedReportType == 'region') {
      this.exportReport_excel(
        'region',
        ReportByRegion_,
        this.exportDataColumns_ReportByRegion,
        'Findings Report',
        'AFRFMS - Findings Report'
      );
    } else if (this.selectedReportType == 'finding_status') {
      this.exportReport_excel(
        'finding_status',
        ReportByFindingStatus_,
        this.exportDataColumns_ReportByFindingStatus,
        'Findings Report',
        'AFRFMS - Findings Report'
      );
    } else if (this.selectedReportType == 'rectification_date_range') {
      this.exportReport_excel(
        'rectification_date_range',
        ReportByRectificationDate_,
        this.exportDataColumns_ReportByRectificationDate,
        'Findings Report',
        'AFRFMS - Findings Report'
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
        'AFRFMS - Findings Report'
      );
    } else if (this.selectedReportType == 'general') {
      this.exportReport_excel(
        'general',
        ReportByGeneral_,
        this.exportDataColumns_ReportByGeneral,
        'Findings Report',
        'AFRFMS - Findings Report'
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
        (this.branch_report.debit_amount_max !== undefined &&
          this.branch_report.debit_amount_max !== null) ||
        (this.branch_report.debit_amount_min !== undefined &&
          this.branch_report.debit_amount_min !== null) ||
        (this.branch_report.credit_amount_max !== undefined &&
          this.branch_report.credit_amount_max !== null) ||
        (this.branch_report.credit_amount_min !== undefined &&
          this.branch_report.credit_amount_min !== null)
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
      .fetchReportAbnormalBalance(this.branch_report)
      .subscribe(
        (data: any) => {
          this.reportResponse = data;
          this.filter_spinner = false;
          this.searchClicked = true;
        },
        (error: any) => {
          console.error('error: ' + JSON.stringify(error, null, 4));
        }
      );

    if (this.branch_report.single_filter_info == 'branch') {
      this.cols = ReportByBranchNameAbnormalBalance.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
    } else if (this.branch_report.single_filter_info == 'region') {
      this.cols = ReportByRegionAbnormalBalance.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
    } else if (this.branch_report.single_filter_info == 'finding_status') {
      this.cols = ReportByFindingStatusAbnormalBalance.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
    } else if (
      this.branch_report.single_filter_info == 'rectification_date_range'
    ) {
      this.cols = ReportByRectificationDateAbnormalBalance.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
    } else if (this.branch_report.single_filter_info == 'audit_finding') {
      this.cols = ReportByAuditFindingAbnormalBalance.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
    } else if (this.branch_report.single_filter_info == 'date_range') {
      this.cols = ReportByDateRangeAbnormalBalance.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
    } else if (this.branch_report.single_filter_info == 'amount') {
      this.cols = ReportByAmountAbnormalBalance.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
    } else {
      this.cols = ReportByGeneralAbnormalBalance.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
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
}
