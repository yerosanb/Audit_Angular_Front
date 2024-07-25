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
import { MemoByBranchName } from '../../payloads/MemorandumContigent/Memo-by-branch-name';
import { MemoByAuditFinding } from '../../payloads/MemorandumContigent/Memo-by-audit-finding';
import { MemoByDateRange } from '../../payloads/MemorandumContigent/Memo-by-date-range';
import { MemoByFindingStatus } from '../../payloads/MemorandumContigent/Memo-by-finding-status';
import { MemoByGeneral } from '../../payloads/MemorandumContigent/Memo-by-general';
import { MemoByRectificationDate } from '../../payloads/MemorandumContigent/Memo-by-rectification-date';
import { MemoByRegion } from '../../payloads/MemorandumContigent/Memo-by-region';
import { MemoBYContigentAmount } from '../../payloads/MemorandumContigent/Memo-bycontigent-amount';
import { ByMemorandumAmount } from '../../payloads/MemorandumContigent/by-memorandum-amount';
import { MemoByAuditPeriod } from '../../payloads/MemorandumContigent/memo-by-audit-period';
import { Memorundompayload } from '../../payloads/MemorandumContigent/memorundompayload';

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
  selector: 'app-memorandum-contigent',
  templateUrl: './memorandum-contigent.component.html',
  styleUrls: ['./memorandum-contigent.component.css'],
})
export class MemorandumContigentComponent {
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
  branch_report = new Memorundompayload();
  searchClicked = false;
  stateOptions: any[];
  finding_status: any[];
  loading: boolean = false;
  minValueForMax: any = 0;
  minValueForMax2: any = 0;

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

  updateMemoMaxValue() {
    if (this.branch_report.memorandum_amount_min != undefined)
      this.minValueForMax = this.branch_report.memorandum_amount_min;
  }

  updateContingentMaxValue() {
    if (this.branch_report.contingent_amount_min != undefined)
      this.minValueForMax2 = this.branch_report.contingent_amount_min;
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
    this.branch_report_service.getFindings('MemorandomContingent').subscribe({
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
      'memorandum_amount',
      'difference',
      'contingent_amount',
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

  exportDataColumns_ReportByBranchName: MemoByBranchName[] = [];
  exportDataColumns_ReportByAuditPeriod: MemoByAuditPeriod[] = [];
  exportDataColumns_ReportByRegion: MemoByRegion[] = [];
  exportDataColumns_ReportByFindingStatus: MemoByFindingStatus[] = [];
  exportDataColumns_ReportByRectificationDate: MemoByRectificationDate[] = [];
  // exportDataColumns_ReportByAuditFinding: MemoByAuditFinding[] = [];
  exportDataColumns_ReportByDateRange: MemoByDateRange[] = [];
  exportDataColumns_ReportByMemorandumAmount: ByMemorandumAmount[] = [];
  exportDataColumns_ReportByContigentAmount: MemoBYContigentAmount[] = [];
  exportDataColumns_ReportByGeneral: MemoByGeneral[] = [];

  exportExcel() {
    this.exportDataColumns_ReportByBranchName = [];
    this.exportDataColumns_ReportByAuditPeriod = [];
    this.exportDataColumns_ReportByRegion = [];
    this.exportDataColumns_ReportByFindingStatus = [];
    this.exportDataColumns_ReportByRectificationDate = [];
    // this.exportDataColumns_ReportByAuditFinding = [];
    this.exportDataColumns_ReportByDateRange = [];
    this.exportDataColumns_ReportByMemorandumAmount = [];
    this.exportDataColumns_ReportByContigentAmount = [];
    this.exportDataColumns_ReportByGeneral = [];

    let ReportByRegion_: MemoByRegion = {
      id: undefined,
      region_name: undefined,
      audit_finding: undefined,

      memorandum_amount: undefined,
      contingent_amount: undefined,
      difference: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };

    let ReportByBranchName_: MemoByBranchName = {
      id: undefined,
      case_number: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      memorandum_amount: undefined,
      contingent_amount: undefined,
      difference: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByAuditPeriod_: MemoByAuditPeriod = {
      id: undefined,
      case_number: undefined,
      audit_period: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      memorandum_amount: undefined,
      contingent_amount: undefined,
      difference: undefined,
      // account_number: undefined,
      // account_holder_nmae: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByFindingStatus_: MemoByFindingStatus = {
      id: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      memorandum_amount: undefined,
      contingent_amount: undefined,
      difference: undefined,
      // account_number: undefined,
      // account_holder_nmae: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByRectificationDate_: MemoByRectificationDate = {
      id: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      memorandum_amount: undefined,
      contingent_amount: undefined,
      difference: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByAuditFinding_: MemoByAuditFinding = {
      branch_name: undefined,
      audit_finding: undefined,
      memorandum_amount: undefined,
      contingent_amount: undefined,
      difference: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByDateRange_: MemoByDateRange = {
      id: undefined,
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      memorandum_amount: undefined,
      contingent_amount: undefined,
      difference: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByMemorandumAmount_: ByMemorandumAmount = {
      id: undefined,
      branch_name: undefined,
      audit_report_date: undefined,
      audit_finding: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      memorandum_amount: undefined,
      contingent_amount: undefined,
      difference: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByContingentAccount_: MemoBYContigentAmount = {
      id: undefined,
      branch_name: undefined,
      audit_report_date: undefined,
      audit_finding: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      memorandum_amount: undefined,
      contingent_amount: undefined,
      difference: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
    };
    let ReportByGeneral_: MemoByGeneral = {
      id: undefined,
      case_number: undefined,
      branch_name: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      audit_report_date: undefined,
      audit_finding: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      memorandum_amount: undefined,
      contingent_amount: undefined,
      difference: undefined,
      // account_number: undefined,
      // account_holder_name: undefined,
      transaction_date: undefined,
      auditee_response: undefined,
      cash_type: undefined,
    };
    // if (this.selectedReportType == 'region') {
    //   this.exportReport_excel(
    //     'region',
    //     ReportByRegion_,
    //     this.exportDataColumns_ReportByRegion,
    //     'Findings Report',
    //     'AFRFMS - Memorandum and Contingent Accounts Report by region'
    //   );
    // }
    if (this.selectedReportType == 'branch') {
      this.exportReport_excel(
        'branch',
        ReportByBranchName_,
        this.exportDataColumns_ReportByBranchName,
        'Findings Report',
        'AFRFMS - Memorandum and Contingent Accounts Report by branch name'
      );
    } else if (this.selectedReportType == 'audit_period') {
      this.exportReport_excel(
        'audit_period',
        ReportByAuditPeriod_,
        this.exportDataColumns_ReportByAuditPeriod,
        'Findings Report',
        'AFRFMS - Memorandum and Contingent Accounts Report by audit period'
      );
    } else if (this.selectedReportType == 'region') {
      this.exportReport_excel(
        'region',
        ReportByRegion_,
        this.exportDataColumns_ReportByRegion,
        'Findings Report',
        'AFRFMS - Memorandum and Contingent Accounts Report by region'
      );
    } else if (this.selectedReportType == 'finding_status') {
      this.exportReport_excel(
        'finding_status',
        ReportByFindingStatus_,
        this.exportDataColumns_ReportByFindingStatus,
        'Findings Report',
        'AFRFMS - Memorandum and Contingent Accounts Report by finding status'
      );
    } else if (this.selectedReportType == 'rectification_date_range') {
      this.exportReport_excel(
        'rectification_date_range',
        ReportByRectificationDate_,
        this.exportDataColumns_ReportByRectificationDate,
        'Findings Report',
        'AFRFMS - Memorandum and Contingent Accounts Report by rectification date range'
      );
    } else if (this.selectedReportType == 'date_range') {
      this.exportReport_excel(
        'date_range',
        ReportByDateRange_,
        this.exportDataColumns_ReportByDateRange,
        'Findings Report',
        'AFRFMS - Memorandum and Contingent Accounts Report by rectification date range'
      );
    } else if (this.selectedReportType == 'memorandum_amount') {
      this.exportReport_excel(
        'memorandum_amount',
        ReportByMemorandumAmount_,
        this.exportDataColumns_ReportByMemorandumAmount,
        'Findings Report',
        'AFRFMS - Memorandum and Contingent Accounts Report by memorandum amounts'
      );
    } else if (this.selectedReportType == 'contingent_amount') {
      this.exportReport_excel(
        'contingent_amount',
        ReportByContingentAccount_,
        this.exportDataColumns_ReportByContigentAmount,
        'Findings Report',
        'AFRFMS - Memorandum and Contingent Accounts Report by contingent amounts'
      );
    } else {
      this.exportReport_excel(
        'general',
        ReportByGeneral_,
        this.exportDataColumns_ReportByGeneral,
        'Findings Report',
        'AFRFMS - Memorandum and Contingent Accounts Report'
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
        (this.branch_report.memorandum_amount_min !== undefined &&
          this.branch_report.memorandum_amount_min !== null) ||
        (this.branch_report.memorandum_amount_max !== undefined &&
          this.branch_report.memorandum_amount_max !== null) ||
        (this.branch_report.contingent_amount_min !== undefined &&
          this.branch_report.contingent_amount_min !== null) ||
        (this.branch_report.contingent_amount_max !== undefined &&
          this.branch_report.contingent_amount_max !== null)
      )
        undefinedProperties.push('amount');

      // if (
      //   (this.branch_report.contingent_amount_min !== undefined &&
      //     this.branch_report.contingent_amount_min !== null) ||
      //   (this.branch_report.contingent_amount_max !== undefined &&
      //     this.branch_report.contingent_amount_max !== null)
      // )
      //   undefinedProperties.push('contingent_amount');
      // if
      //  (
      //   this.branch_report.account_number !== undefined &&
      //   this.branch_report.account_number !== null
      // )
      //   undefinedProperties.push('account_number');
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
      .fetchReportMemorandum(this.branch_report)
      .subscribe(
        (data: any) => {
          this.reportResponse = data;
          this.filter_spinner = false;
          this.searchClicked = true;
          this.calculate_totals(data);
          data.forEach((element: any) => {
            console.log(JSON.stringify(element, null, 3))
          });
        },
        (error: any) => {}
      );

    if (this.branch_report.single_filter_info == 'branch') {
      this.cols = MemoByBranchName.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Memorandum and Contingent Accounts Report by branch name';
    } else if (this.branch_report.single_filter_info == 'region') {
      this.cols = MemoByRegion.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Memorandum and Contingent Accounts Report by region';
    } else if (this.branch_report.single_filter_info == 'finding_status') {
      this.cols = MemoByFindingStatus.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Memorandum and Contingent Accounts Report by finding status';
    } else if (
      this.branch_report.single_filter_info == 'rectification_date_range'
    ) {
      this.cols = MemoByRectificationDate.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Memorandum and Contingent Accounts Report by rectification date range';
    } else if (this.branch_report.single_filter_info == 'audit_finding') {
      this.cols = MemoByAuditFinding.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Memorandum and Contingent Accounts Report by audit finding';
    } else if (this.branch_report.single_filter_info == 'date_range') {
      this.cols = MemoByDateRange.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Memorandum and Contingent Accounts Report by date range';
    } else if (this.branch_report.single_filter_info == 'memorandum_amount') {
      this.cols = ByMemorandumAmount.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Memorandum and Contingent Accounts Report by memorandum amount';
    } else if (this.branch_report.single_filter_info == 'contingent_amount') {
      this.cols = MemoBYContigentAmount.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Memorandum and Contingent Accounts Report by contingent amount';
    } else {
      this.cols = MemoByGeneral.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Memorandum and Contingent Accounts Report';
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

  tot_memorandum_amount: number = 0;
  tot_contingent_amount: number = 0;
  tot_difference: number = 0;

  calculate_totals(data: any) {
    this.tot_memorandum_amount = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.memorandum_amount),
      0
    );
    this.tot_contingent_amount = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.contingent_amount),
      0
    );
    this.tot_difference = data.reduce(
      (sum: number, obj: any) => sum + Number(obj.difference),
      0
    );
  }
}
