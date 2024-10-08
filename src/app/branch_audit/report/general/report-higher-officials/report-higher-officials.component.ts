import { Component, OnInit } from '@angular/core';
import { Branches } from 'app/models/admin/branches';
import { Region } from 'app/models/admin/region';
import { ExportExcelService } from 'app/services/shared/export-excel.service';
import { StorageService } from 'app/services/shared/storage.service';
import { MessageService } from 'primeng/api';
import { BranchReport } from '../../payloads/BranchReport';
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
import { BranchReportHigherOfficials } from '../../payloads/Higher Officials/BranchReportHigherOfficials';
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
  selector: 'app-report-higher-officials',
  templateUrl: './report-higher-officials.component.html',
  styleUrls: ['./report-higher-officials.component.css'],
})
export class ReportHigherOfficialsComponent implements OnInit {
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
  branch_report = new BranchReportHigherOfficials();
  searchClicked = false;
  riskLevels: any[];
  moduleTypes: any[];
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

    this.riskLevels = [
      { label: 'High', value: 'High' },
      { label: 'Medium', value: 'Medium' },
      { label: 'Low', value: 'Low' },
    ];

    this.moduleTypes = [
      { label: 'IS', value: 'IS' },
      { label: 'Management', value: 'Management' },
      { label: 'Inspection', value: 'Inspection' },
      { label: 'Branch Financial', value: 'Branch Financial' },
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
    this.ingOptions = [
      { label: 'Conventional', value: 'conventional' },
      { label: 'IFB', value: 'ifb' },
    ];
  }

  minValueForMax = 0;
  updateMaxValue() {
    if (this.branch_report.amount_min != undefined)
      this.minValueForMax = this.branch_report.amount_min;
  }

  newFindingDialog() {
    this.visibled = true;
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
      'card_issued_branch',
      'card_distributed_to_customer',
      'return_to_card_issuance_unit',
      'remaining_card_at_branch',
      'audit_impact',
      'auditor_recommendation',
      'auditee_response',
      'audit_finding_status',
      'rectified_on',
      'audit_period',
      'region_name',
      'case_number',
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
      case_number: undefined,
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
        'AFRFMS - Atm Cards Undelivered Report by branch name'
      );
      // } else if (this.selectedReportType == 'audit_report') {
      //   this.exportReport_excel(
      //     'audit_report',
      //     ReportByAuditPeriod_,
      //     this.exportDataColumns_ReportByAuditPeriod,
      //     'Findings Report',
      //     'AFRFMS - Atm Cards Undelivered Report by branch'
      //   );
    } else if (this.selectedReportType == 'region') {
      this.exportReport_excel(
        'region',
        ReportByRegion_,
        this.exportDataColumns_ReportByRegion,
        'Findings Report',
        'AFRFMS - Atm Cards Undelivered Report by region'
      );
    } else if (this.selectedReportType == 'finding_status') {
      this.exportReport_excel(
        'finding_status',
        ReportByFindingStatus_,
        this.exportDataColumns_ReportByFindingStatus,
        'Findings Report',
        'AFRFMS - Atm Cards Undelivered Report by finding status'
      );
    } else if (this.selectedReportType == 'rectification_date_range') {
      this.exportReport_excel(
        'rectification_date_range',
        ReportByRectificationDate_,
        this.exportDataColumns_ReportByRectificationDate,
        'Findings Report',
        'AFRFMS - Atm Cards Undelivered Report by rectification date'
      );
    } else if (this.selectedReportType == 'audit_finding') {
      this.exportReport_excel(
        'audit_finding',
        ReportByAuditFinding_,
        this.exportDataColumns_ReportByAuditFinding,
        'Findings Report',
        'AFRFMS - Atm Cards Undelivered Report by audit finding'
      );
    } else if (this.selectedReportType == 'date_range') {
      this.exportReport_excel(
        'date_range',
        ReportByDateRange_,
        this.exportDataColumns_ReportByDateRange,
        'Findings Report',
        'AFRFMS - Atm Cards Undelivered Report by Date of Discrepancy'
      );
    } else if (this.selectedReportType == 'general') {
      this.exportReport_excel(
        'general',
        ReportByGeneral_,
        this.exportDataColumns_ReportByGeneral,
        'Findings Report',
        'AFRFMS - Atm Cards Undelivered Report'
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
  }

  submitReportRequest(): void {
    this.filter_spinner = true;

    this.branch_report_service.fetchHigherOfficialReport(this.branch_report).subscribe(
      (data: any) => {
        this.reportResponse = data;
        this.filter_spinner = false;
        this.searchClicked = true;
      },
      (error: any) => {}
    );

    // if (this.branch_report.single_filter_info == 'branch') {
    //   this.cols = ReportByBranchName.getHeaders();
    //   this.selectedColumns_branch_audit_report = this.cols;
    //   this.exportColumns = this.cols.map((col) => ({
    //     title: col.header,
    //     dataKey: col.field,
    //   }));
    //   this.selectedTitleForReport =
    //     'AFRFMS - Atm Cards Undelivered Report by branch';
    // } else if (this.branch_report.single_filter_info == 'region') {
    //   this.cols = ReportByRegion.getHeaders();
    //   this.selectedColumns_branch_audit_report = this.cols;
    //   this.exportColumns = this.cols.map((col) => ({
    //     title: col.header,
    //     dataKey: col.field,
    //   }));
    //   this.selectedTitleForReport =
    //     'AFRFMS - Atm Cards Undelivered Report by region';
    // } else if (this.branch_report.single_filter_info == 'finding_status') {
    //   this.cols = ReportByFindingStatus.getHeaders();
    //   this.selectedColumns_branch_audit_report = this.cols;
    //   this.exportColumns = this.cols.map((col) => ({
    //     title: col.header,
    //     dataKey: col.field,
    //   }));
    //   this.selectedTitleForReport =
    //     'AFRFMS - Atm Cards Undelivered Report by finding status';
    // } else if (
    //   this.branch_report.single_filter_info == 'rectification_date_range'
    // ) {
    //   this.cols = ReportByRectificationDate.getHeaders();
    //   this.selectedColumns_branch_audit_report = this.cols;
    //   this.exportColumns = this.cols.map((col) => ({
    //     title: col.header,
    //     dataKey: col.field,
    //   }));
    //   this.selectedTitleForReport =
    //     'AFRFMS - Atm Cards Undelivered Report by rectification date';
    // } else if (this.branch_report.single_filter_info == 'audit_finding') {
    //   this.cols = ReportByAuditFinding.getHeaders();
    //   this.selectedColumns_branch_audit_report = this.cols;
    //   this.exportColumns = this.cols.map((col) => ({
    //     title: col.header,
    //     dataKey: col.field,
    //   }));
    //   this.selectedTitleForReport =
    //     'AFRFMS - Atm Cards Undelivered Report by audit finding';
    // } else if (this.branch_report.single_filter_info == 'date_range') {
    //   this.cols = ReportByDateRange.getHeaders();

    //   this.selectedColumns_branch_audit_report = this.cols;
    //   this.exportColumns = this.cols.map((col) => ({
    //     title: col.header,
    //     dataKey: col.field,
    //   }));
    //   this.selectedTitleForReport =
    //     'AFRFMS - Atm Cards Undelivered Report by Date of Discrepancy';
    // } else {
    //   this.cols = ReportByGeneral.getHeaders();

    //   this.selectedColumns_branch_audit_report = this.cols;
    //   this.exportColumns = this.cols.map((col) => ({
    //     title: col.header,
    //     dataKey: col.field,
    //   }));
    //   this.selectedTitleForReport = 'AFRFMS - Atm Cards Undelivered Report';
    // }
    // {
    //   this.selectedReportType = this.branch_report.single_filter_info;
    //   const a = this.branch_report;
    //   this.branch_report = this.clearData(this.branch_report);
    //   a.single_filter_info = undefined;
    //   this.branch_report = a;
    //   if (
    //     this.branch_report.date_range != undefined &&
    //     this.branch_report.date_range[0] == '' &&
    //     this.branch_report.date_range[1] == ''
    //   )
    //     this.branch_report.date_range = undefined;

    //   if (
    //     this.branch_report.rectification_date_range != undefined &&
    //     this.branch_report.rectification_date_range[0] == '' &&
    //     this.branch_report.rectification_date_range[1] == ''
    //   )
    //     this.branch_report.rectification_date_range = undefined;
    // }
  }
}
