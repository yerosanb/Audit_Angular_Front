export class ByMemorandumAmount {
  id?: any;
  [x: string]: any;
  branch_name?: String;
  audit_report_date?: Date;
  audit_finding?: String;
  audit_impact?: String;
  auditor_recommendation?: String;

  memorandum_amount?: number;
  contingent_amount?: number;
  difference?: number;

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
      { field: 'memorandum_amount', header: 'Memorandum Amount' },
      { field: 'Contingent_amount', header: 'Contingent Amount' },
      { field: 'Difference', header: 'difference' },

      { field: 'rectified_on', header: 'Rectified On' },

    ];
  }
}
