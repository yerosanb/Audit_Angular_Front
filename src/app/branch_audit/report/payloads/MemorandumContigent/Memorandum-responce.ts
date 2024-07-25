export class MemorandumResponce {
  id?: any;
  case_number?: String;
  branch_name?: String;
  audit_finding?: String;
  auditor_name?: String;
  audit_impact?: String;
  auditor_recommendation?: String;
  auditee_response?: String;
  audit_finding_status?: String;

  memorandum_amount?: number;
  contingent_amount?: number;
  difference?: number;

  audit_report_date?: Date;
  rectified_on?: Date;
  cash_type?: String;
  fcy?: String;

  static getHeaders(): any[] {
    return [
      { field: 'case_number', header: 'Case Number' },
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'audit_finding', header: 'Audit Finding' },
      { field: 'auditor_name', header: 'Auditor Name' },
      { field: 'audit_impact', header: 'Audit Impact' },
      { field: 'auditor_recommendation', header: 'Auditor Recommendation' },
      { field: 'auditee_response', header: 'Auditee Response' },
      { field: 'audit_finding_status', header: 'Audit Finding Status' },
      {
        field: 'memorandum_amount',
        header: 'Memorandum Amount',
      },
      { field: 'Difference', header: 'difference' },

      {
        field: 'contingent_amount',
        header: 'Contingent Amount',
      },

      {
        field: 'difference',
        header: 'Difference',
      },

      { field: 'audit_report_date', header: 'Audit Report Date' },
      { field: 'rectified_on', header: 'Rectified On' },
      { field: 'cash_type', header: 'Cash Type' },
      { field: 'fcy', header: 'Fcy' },
    ];
  }
}
