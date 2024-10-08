import { Component, OnInit } from '@angular/core';
import { Branches } from 'app/models/admin/branches';
import { MgtReport } from 'app/models/shared/ism/mgt-report';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Region } from 'app/models/admin/region';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { ExportExcelService } from 'app/services/shared/export-excel.service';
import { imgBase64 } from 'app/helpers/logo';
import { StorageService } from 'app/services/shared/storage.service';
import { BranchReportService } from '../../service/branch-report.service';
import { FindingsR } from '../../payloads/findingsR';
import { BranchesR } from '../../payloads/branchesR';
import { BranchReport } from '../../payloads/BranchReport';
import { OperationalDescripency } from '../../payloads/operational-descripency';
import { OperationalByBranchName } from '../../payloads/operational-by-branch-name';
import { OperationalByRegion } from '../../payloads/operational-by-region';
import { OperationalByFindingStatus } from '../../payloads/operational-by-finding-status';
import { OperationalByRectificationDate } from '../../payloads/operational-by-rectification-date';
import { OperationalByAuditFinding } from '../../payloads/operational-by-audit-finding';
import { OperationalByDateRange } from '../../payloads/operational-by-date-range';
import { OperationByGeneral } from '../../payloads/operation-by-general';
import { OperationalByAmount } from '../../payloads/operational-by-amount';
import { OperationalByAuditPeriod } from '../../payloads/operational-by-audit-period';
import { OperationalByCategoryOfDescripency } from '../../payloads/operational-by-category-of-descripency';

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
  selector: 'app-report-operational-descripency',
  templateUrl: './report-operational-descripency.component.html',
  styleUrls: ['./report-operational-descripency.component.css'],
})
export class ReportOperationalDescripencyComponent {
  maxDate: Date;
  visibled: boolean = false;
  newFinding: string;
  filter_spinner: boolean = false;
  // minValueForMax: any;
  minValueForMax: any = 0;

  regionOptions: Region[] = [];
  categoryOfDiscrepancyOptions: Branches[] = [];
  auditFindingOptions: FindingsR[] = [];
  auditFindingOption: FindingsR;
  branchOptions: BranchesR[] = [];
  branchHolder: BranchesR[] = [];
  branch_report = new OperationalDescripency();
  searchClicked = false;
  stateOptions: any[];
  finding_status: any[];
  loading: boolean = false;
  selectedTitleForReport: string = 'AFRFMS - Findings Report';

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
    this.getDiscrepancies();
    // this.getFindings();
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

  updateMaxValue() {
    if (this.branch_report.min_amount != undefined)
      this.minValueForMax = this.branch_report.min_amount;
  }

  //  updateMaxValue() {
  //   if (this.branch_report.min_amount !== undefined && !isNaN(Number(this.branch_report.min_amount))) {
  //     this.minValueForMax = Number(this.branch_report.min_amount.valueOf());
  //   } else {
  //     // Reset minValueForMax to a default value or null to disable the min constraint
  //     this.minValueForMax = null;
  //   }
  // }

  onRegionCleared() {
    this.branchOptions = this.branchHolder;
  }

  // getFindings() {
  //   this.branch_report_service.getFindings().subscribe({
  //     next: (data) => {
  //       this.auditFindingOptions = data;
  //     },
  //     error: (error) => {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Error',
  //         detail: 'Something went wrong while fetching findings!',
  //         life: 3000,
  //       });
  //     },
  //   });
  // }

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
      'case_number',
      'branch_name',
      'audit_finding',
      'auditor_name',
      'audit_impact',
      'auditor_recommendation',
      'auditee_response',
      'audit_finding_status',
      'amount',
      'account_number',
      'account_holder_name',
      'transaction_date',
      'audit_report_date',
      'rectified_on',
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

  exportDataColumns_ReportByBranchName: OperationalByBranchName[] = [];
  exportDataColumns_ReportByAuditPeriod: OperationalByAuditPeriod[] = [];
  exportDataColumns_ReportByRegion: OperationalByRegion[] = [];
  exportDataColumns_ReportByFindingStatus: OperationalByFindingStatus[] = [];
  exportDataColumns_ReportByRectificationDate: OperationalByRectificationDate[] =
    [];
  //exportDataColumns_ReportByAuditFinding: OperationalByAuditFinding[] = [];
  exportDataColumns_ReportByDateRange: OperationalByDateRange[] = [];
  exportDataColumns_ReportByAmount: OperationalByAmount[] = [];
  exportDataColumns_ReportByCategoryOfDescripency: OperationalByCategoryOfDescripency[] =
    [];

  exportDataColumns_ReportByGeneral: OperationByGeneral[] = [];

  exportExcel() {
    this.exportDataColumns_ReportByBranchName = [];
    this.exportDataColumns_ReportByAuditPeriod = [];
    this.exportDataColumns_ReportByRegion = [];
    this.exportDataColumns_ReportByFindingStatus = [];
    this.exportDataColumns_ReportByRectificationDate = [];
    // this.exportDataColumns_ReportByAuditFinding = [];
    this.exportDataColumns_ReportByDateRange = [];
    this.exportDataColumns_ReportByAmount = [];
    this.exportDataColumns_ReportByGeneral = [];
    this.exportDataColumns_ReportByCategoryOfDescripency = [];

    let ReportByRegion_: OperationalByRegion = {
      id: undefined,
      region_name: undefined,
      audit_finding: undefined,
      amount: undefined,
      // account_number: undefined,
      // account_holder_name: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
      fcy: undefined,

    };

    let ReportByBranchName_: OperationalByBranchName = {
      id: undefined,
      case_number: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      amount: undefined,
      // account_number: undefined,
      // account_holder_name: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
      fcy: undefined,

    };

    let ReportByBranchCategoryofDescripency_: OperationalByCategoryOfDescripency =
      {
        id: undefined,
        // case_number: undefined,
        branch_name: undefined,
        audit_finding_status: undefined,
        rectified_on: undefined,
        // audit_report_date: undefined,
        audit_finding: undefined,
        audit_impact: undefined,
        auditor_recommendation: undefined,
        amount: undefined,
        // account_number: undefined,
        // account_holder_name: undefined,
        auditee_response: undefined,
        cash_type: undefined,
        fcy: undefined,

      };

    let ReportByAuditPeriod_: OperationalByAuditPeriod = {
      id: undefined,
      case_number: undefined,
      audit_period: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      amount: undefined,
      // account_number: undefined,
      // account_holder_nmae: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
      fcy: undefined,

    };
    let ReportByFindingStatus_: OperationalByFindingStatus = {
      id: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      amount: undefined,
      // account_number: undefined,
      // account_holder_nmae: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
      fcy: undefined,

    };
    let ReportByRectificationDate_: OperationalByRectificationDate = {
      id: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      amount: undefined,
      // account_number: undefined,
      // account_holder_name: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
      fcy: undefined,

    };

    // let ReportByAuditFinding_:OperationalByAuditFinding = {

    //   branch_name: undefined,
    //   audit_finding: undefined,
    //   amount: undefined,

    //   audit_impact: undefined,
    //   auditor_recommendation: undefined,
    //   auditee_response: undefined,
    //   audit_finding_status: undefined,
    //   rectified_on: undefined,
    // };

    let ReportByDateRange_: OperationalByDateRange = {
      id: undefined,
      audit_report_date: undefined,
      branch_name: undefined,
      audit_finding: undefined,
      amount: undefined,

      audit_impact: undefined,
      auditor_recommendation: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
      fcy: undefined,

    };

    let ReportByAmount_: OperationalByAmount = {
      id: undefined,
      branch_name: undefined,
      audit_report_date: undefined,
      audit_finding: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,
      amount: undefined,
      auditee_response: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      cash_type: undefined,
      fcy: undefined,

    };

    // let ReportByAccountNumber_: OperationalByAccountNumber = {
    //   audit_report_date : undefined,
    //   branch_name : undefined,
    //   audit_finding : undefined,
    //   amount: undefined,
    //   account_number: undefined,
    //   account_holder_name: undefined,
    //   audit_impact : undefined,
    //   auditor_recommendation : undefined,
    //   auditee_response : undefined,
    //   audit_finding_status : undefined,
    //   rectified_on : undefined,
    // };

    let ReportByGeneral_: OperationByGeneral = {
      id: undefined,
      case_number: undefined,
      branch_name: undefined,
      audit_finding_status: undefined,
      rectified_on: undefined,
      audit_report_date: undefined,
      audit_finding: undefined,
      audit_impact: undefined,
      auditor_recommendation: undefined,

      amount: undefined,
      account_number: undefined,
      account_holder_name: undefined,
      transaction_date: undefined,

      auditee_response: undefined,
      cash_type: undefined,
      fcy: undefined,

    };

    if (this.selectedReportType == 'branch') {
      this.exportReport_excel(
        'branch',
        ReportByBranchName_,
        this.exportDataColumns_ReportByBranchName,
        'Findings Report',
        'AFRFMS - Transaction Related Findings Report by branch name'
      );
    } else if (this.selectedReportType == 'audit_period') {
      this.exportReport_excel(
        'audit_period',
        ReportByAuditPeriod_,
        this.exportDataColumns_ReportByAuditPeriod,
        'Findings Report',
        'AFRFMS -  Transaction Related Findings Report by audit period'
      );
    } else if (this.selectedReportType == 'region') {
      this.exportReport_excel(
        'region',
        ReportByRegion_,
        this.exportDataColumns_ReportByRegion,
        'Findings Report',
        'AFRFMS -  Transaction Related Findings Report by region'
      );
    } else if (this.selectedReportType == 'finding_status') {
      this.exportReport_excel(
        'finding_status',
        ReportByFindingStatus_,
        this.exportDataColumns_ReportByFindingStatus,
        'Findings Report',
        'AFRFMS -  Transaction Related Findings Report by finding status'
      );
    } else if (this.selectedReportType == 'category_of_discrepancy') {
      this.exportReport_excel(
        'category_of_discrepancy',
        ReportByBranchCategoryofDescripency_,
        this.exportDataColumns_ReportByCategoryOfDescripency,
        'Findings Report',
        'AFRFMS -  Transaction Related Findings Report by category of descripency'
      );
    } else if (this.selectedReportType == 'rectification_date_range') {
      this.exportReport_excel(
        'rectification_date_range',
        ReportByRectificationDate_,
        this.exportDataColumns_ReportByRectificationDate,
        'Findings Report',
        'AFRFMS -  Transaction Related Findings Report by rectification date range'
      );
    } else if (this.selectedReportType == 'date_range') {
      this.exportReport_excel(
        'date_range',
        ReportByDateRange_,
        this.exportDataColumns_ReportByDateRange,
        'Findings Report',
        'AFRFMS -  Transaction Related Findings Report by date range'
      );
    } else if (this.selectedReportType == 'amount') {
      this.exportReport_excel(
        'amount',
        ReportByAmount_,
        this.exportDataColumns_ReportByAmount,
        'Findings Report',
        'AFRFMS -  Transaction Related Findings Report by amount'
      );
    } else {
      this.exportReport_excel(
        'general',
        ReportByGeneral_,
        this.exportDataColumns_ReportByGeneral,
        'Findings Report',
        'AFRFMS -  Transaction Related Findings Report'
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
        (this.branch_report.min_amount !== undefined &&
          this.branch_report.min_amount !== null) ||
        (this.branch_report.max_amount !== undefined &&
          this.branch_report.max_amount !== null)
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
      .fetchReportOperation(this.branch_report)
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
      this.cols = OperationalByBranchName.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Transaction Related Findings Report by branch';
    } else if (this.branch_report.single_filter_info == 'region') {
      this.cols = OperationalByRegion.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Transaction Related Findings Report by region';
    } else if (this.branch_report.single_filter_info == 'finding_status') {
      this.cols = OperationalByFindingStatus.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));

      this.selectedTitleForReport =
        'AFRFMS - Transaction Related Findings Report by finding status';
    } else if (
      this.branch_report.single_filter_info == 'rectification_date_range'
    ) {
      this.cols = OperationalByRectificationDate.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Transaction Related Findings Report by rectification date range';
    } else if (this.branch_report.single_filter_info == 'audit_finding') {
      this.cols = OperationalByAuditFinding.getHeaders();
      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Transaction Related Findings Report by audit finding';
    } else if (this.branch_report.single_filter_info == 'date_range') {
      this.cols = OperationalByDateRange.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Transaction Related Findings Report by date range';
    } else if (
      this.branch_report.single_filter_info == 'category_of_discrepancy'
    ) {
      this.cols = OperationalByCategoryOfDescripency.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Transaction Related Findings Report by category of descripency';
    } else if (this.branch_report.single_filter_info == 'amount') {
      this.cols = OperationalByAmount.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));

      this.selectedTitleForReport =
        'AFRFMS - Transaction Related Findings Report by amount';
    } else {
      this.cols = OperationByGeneral.getHeaders();

      this.selectedColumns_branch_audit_report = this.cols;
      this.exportColumns = this.cols.map((col) => ({
        title: col.header,
        dataKey: col.field,
      }));
      this.selectedTitleForReport =
        'AFRFMS - Transaction Related Findings Report';
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
    this.tot_amount = data.reduce((sum: number, obj: any) => sum + Number(obj.amount), 0);
  }
}
