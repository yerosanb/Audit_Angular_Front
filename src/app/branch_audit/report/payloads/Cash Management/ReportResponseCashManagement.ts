export class ReportResponseCashManagement {
  id?: any;
  case_number?: String;
  branch_name?: String;
  region_name?: String;
  audit_finding?: String;
  auditor_name?: String;
  audit_impact?: String;
  auditor_recommendation?: String;
  auditee_response?: String;
  audit_finding_status?: String;

  average_cash_holding?: number;
  branch_cash_set_limit?: number;
  mid_rate_fcy?: number;
  difference?: number;
  // cash_type?: string;

  audit_report_date?: Date;
  rectified_on?: Date;
  cash_type?: String;
  fcy?: String;

  static getHeaders(): any[] {
    return [
      { field: 'case_number', header: 'Case Number' },
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'region_name', header: 'Region Name' },
      { field: 'audit_finding', header: 'Audit Finding' },
      { field: 'auditor_name', header: 'Auditor Name' },
      { field: 'audit_impact', header: 'Audit Impact' },
      { field: 'auditor_recommendation', header: 'Auditor Recommendation' },
      { field: 'auditee_response', header: 'Auditee Response' },
      { field: 'audit_finding_status', header: 'Audit Finding Status' },

      { field: 'average_cash_holding', header: 'Average Cash Holding' },
      { field: 'branch_cash_set_limit', header: 'Cash Set Limit' },
      { field: 'mid_rate_fcy', header: 'Mid Rate FCY' },
      { field: 'difference', header: 'Difference' },
      // { field: 'cash_type', header: 'Currency Type' },

      { field: 'audit_report_date', header: 'Audit Report Date' },
      { field: 'rectified_on', header: 'Rectified On' },
      { field: 'cash_type', header: 'Cash Type' },
      { field: 'fcy', header: 'Fcy' },
    ];
  }
}
