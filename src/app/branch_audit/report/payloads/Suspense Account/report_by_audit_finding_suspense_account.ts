export class ReportByAuditFindingSuspenseAccount {
  [x: string]: any;
  id?: any;
  branch_name?: String;
  audit_finding?: String;

  difference?: number;
  // tracer_date?: string[];
  balance_per_tracer?: number;
  balance_per_trial_balance?: number;

  audit_impact?: String;
  auditor_recommendation?: String;
  auditee_response?: String;
  audit_finding_status?: String;
  rectified_on?: Date;

  static getHeaders(): any[] {
    return [
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'audit_finding', header: 'Audit Finding' },
      { field: 'audit_impact', header: 'Audit Impact' },
      { field: 'auditor_recommendation', header: 'Auditor Recommendation' },
      { field: 'auditee_response', header: 'Auditee Response' },
      { field: 'audit_finding_status', header: 'Audit Finding Status' },

      { field: 'difference', header: 'Difference Amount' },
      // { field: 'tracer_date', header: 'Tracer Date' },
      { field: 'balance_per_tracer', header: 'Balance As Per Tracer' },
      {
        field: 'balance_per_trial_balance',
        header: 'Balance As Per Trial Balance',
      },

      { field: 'rectified_on', header: 'Rectified On' },
    ];
  }
}
