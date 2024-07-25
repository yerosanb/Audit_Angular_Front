export class ReportByBranchNameSuspenseAccount {
  [x: string]: any;
  id?: any;

  case_number?: String;
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


/*

_abnormal_balance


AbnormalBalance

  account_affected?: string;
  debit_amount?: Number;
  credit_amount?: Number;
  difference_amount?: Number;


      { field: 'credit_amount', header: 'Credit Amount' },
      { field: 'debit_amount', header: 'Debit Amount' },
      { field: 'account_affected', header: 'Account Affected' },
      { field: 'difference_amount', header: 'Difference Affected' },



*/