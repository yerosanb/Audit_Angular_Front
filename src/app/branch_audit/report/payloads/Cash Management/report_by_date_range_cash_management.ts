export class ReportByDateRangeCashManagement {
  [x: string]: any;
  id?: any;
  audit_report_date?: Date;
  branch_name?: String;
  audit_finding?: String;

  average_cash_holding?: number;
  branch_cash_set_limit?: number;
  mid_rate_fcy?: number;
  difference?: number;
  // cash_type?: string;

  audit_impact?: String;
  auditor_recommendation?: String;
  auditee_response?: String;
  audit_finding_status?: String;
  rectified_on?: Date;

  static getHeaders(): any[] {
    return [
      { field: 'audit_report_date', header: 'Date' },
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'audit_finding', header: 'Audit Finding' },
      { field: 'audit_impact', header: 'Audit Impact' },
      { field: 'auditor_recommendation', header: 'Auditor Recommendation' },
      { field: 'auditee_response', header: 'Auditee Response' },
      { field: 'audit_finding_status', header: 'Audit Finding Status' },

      { field: 'average_cash_holding', header: 'Average Cash Holding' },
      { field: 'branch_cash_set_limit', header: 'Cash Set Limit' },
      { field: 'mid_rate_fcy', header: 'Mid Rate FCY' },
      { field: 'difference', header: 'Difference' },
      // { field: 'cash_type', header: 'Currency Type' },

      { field: 'rectified_on', header: 'Rectified On' },
    ];
  }
}
