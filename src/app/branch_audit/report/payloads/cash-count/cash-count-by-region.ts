export class CashCountByRegion {
  [x: string]: any;
  id?: any;
  region_name?: String;
  audit_finding?: String;
  case_number?: String;

  // amount?: String;
  // account_number?: String;
  // account_holder_name?: String;

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
      { field: 'region_name', header: 'Region Name' },
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
      // {
      //   field: 'account_number',
      //   header: 'Account Number',
      // },
      // {
      //   field: 'account_holder_name',
      //   header: 'Account Holder',
      // },
      { field: 'rectified_on', header: 'Rectified On' },

    ];
  }
}
