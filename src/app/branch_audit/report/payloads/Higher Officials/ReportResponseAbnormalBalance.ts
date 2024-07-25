export class ReportResponseAbnormalBalance {
  id?: any;
  case_number?: String;
  branch_name?: String;
  region_name?: String;
  audit_finding?: String;
  audit_impact?: String;
  auditor_recommendation?: String;
  auditee_response?: String;
  audit_finding_status?: String;

  debit_amount?: Number;
  credit_amount?: Number;
  difference_amount?: Number;

  audit_report_date?: Date;
  rectified_on?: Date;

  static getHeaders(): any[] {
    return [
      { field: 'case_number', header: 'Case Number' },
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'region_name', header: 'Region Name' },
      { field: 'audit_finding', header: 'Audit Finding' },
      { field: 'audit_impact', header: 'Audit Impact' },
      { field: 'auditor_recommendation', header: 'Auditor Recommendation' },
      { field: 'auditee_response', header: 'Auditee Response' },
      { field: 'audit_finding_status', header: 'Audit Finding Status' },

      { field: 'credit_amount', header: 'Credit Amount' },
      { field: 'debit_amount', header: 'Debit Amount' },
      { field: 'difference_amount', header: 'Difference Affected' },

      { field: 'audit_report_date', header: 'Audit Report Date' },
      { field: 'rectified_on', header: 'Rectified On' },
    ];
  }
}


