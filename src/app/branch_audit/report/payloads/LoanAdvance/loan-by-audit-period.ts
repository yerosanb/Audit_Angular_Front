export class LoanByAuditPeriod {
  [x: string]: any;
  id?: any;
  case_number?: String;
  audit_period?: String;
  branch_name?: String;
  audit_finding?: String;

  // account_number?: String;
  // account_holder_nmae?: String;
  audit_impact?: String;
  auditor_recommendation?: String;
  auditee_response?: String;
  audit_finding_status?: String;
  rectified_on?: Date;

  amount_granted?: number;
  interest_rate?: number;
  arrears?: number;

  approved_amount?: number;
  overdrawn_balance?: number;
  difference?: number;
  penality_charge_collection?: number;

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
      { field: 'rectified_on', header: 'Rectified On' },

      {
        field: 'amount_granted',
        header: 'Amount Granted',
      },
      {
        field: 'interest_rate',
        header: 'Interest Rate',
      },
      {
        field: 'arrears',
        header: 'Arrears',
      },

      { field: 'approved_amount', header: 'Approved Amount' },
      { field: 'overdrawn_balance', header: 'Overdrawn Balance' },
      { field: 'difference', header: 'Difference' },
      {
        field: 'penality_charge_collection',
        header: 'Penalty Charge Collection',
      },
    ];
  }
}
