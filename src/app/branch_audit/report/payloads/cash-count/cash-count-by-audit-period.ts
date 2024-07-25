export class CashCountByAuditPeriod {
  [x: string]: any;
  id?: any;
  case_number?: String;
  audit_period?: String;
  branch_name?: String;
  audit_finding?: String;
  amount?: String;
 

  actual_cash_count?: number;
  trial_balance?: number;
  atm_amount_branch?: number;
  atm_amount_lobby?: number;
  difference?: number;

  audit_impact?: String;
  auditor_recommendation?: String;
  auditee_response?: String;
  audit_finding_status?: String;
  rectified_on?: Date;

  static getHeaders(): any[] {
    return [
      { field: 'case_number', header: 'Case Number' },
      { field: 'audit_period', header: 'Audit Period' },
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'audit_finding', header: 'Audit Finding' },
      { field: 'audit_impact', header: 'Audit Impact' },
      { field: 'auditor_recommendation', header: 'Auditor Recommendation' },
      { field: 'auditee_response', header: 'Auditee Response' },
      { field: 'audit_finding_status', header: 'Audit Finding Status' },
      { field: 'actual_cash_count', header: 'Actual Cash Count' },

      {
        field: 'trial_balance',
        header: 'Trial Balance',
      },
      {
        field: 'atm_amount_branch',
        header: 'Atm Amount Branch',
      },
      {
        field: 'atm_amount_lobby',
        header: 'Atm Amount Lobby',
      },
      {
        field: 'difference',
        header: 'Difference Amount',
      },
      { field: 'rectified_on', header: 'Rectified On' },

    ];
  }
}
