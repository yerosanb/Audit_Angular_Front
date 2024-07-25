export class ReportByGeneralSuspenseAccount {
  id?: any;
  case_number?: String;
  branch_name?: String;
  audit_finding_status?: String;
  rectified_on?: Date;
  audit_report_date?: Date;
  audit_finding?: String;
  audit_impact?: String;
  auditor_recommendation?: String;

  difference?: number;
  // tracer_date?: string[];
  balance_per_tracer?: number;
  balance_per_trial_balance?: number;

  auditee_response?: String;
  [x: string]: any;

  static getHeaders(): any[] {
    return [
      { field: 'audit_report_date', header: 'Date' },
      { field: 'case_number', header: 'Case Number' },
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
