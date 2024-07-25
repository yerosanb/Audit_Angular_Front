export class LoanByGeneral {
  id?: any;
  [x: string]: any;
  case_number?: String;
  branch_name?: String;
  audit_finding_status?: String;
  rectified_on?: Date;
  audit_report_date?: Date;
  audit_finding?: String;
  audit_impact?: String;
  auditor_recommendation?: String;

  loan_disburse_date?: Date;
  borrower_name?: String;
  loan_type?: String;
  amount_granted?: number;
  interest_rate?: number;
  arrears?: number;
  loan_status?: String;
  due_date?: string;

  approved_amount?: number;
  overdrawn_balance?: number;
  difference?: number;
  penality_charge_collection?: number;

  auditee_response?: String;

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

      { field: 'approved_amount', header: 'Approved Amount' },
      { field: 'overdrawn_balance', header: 'Overdrawn Balance' },
      { field: 'difference', header: 'Difference' },
      {
        field: 'penality_charge_collection',
        header: 'Penalty Charge Collection',
      },


      {
        field: 'loan_disburse_date',
        header: 'Loan Disburse Date',
      },
      {
        field: 'borrower_name',
        header: 'Borrower Name',
      },
      {
        field: 'loan_type',
        header: 'Loan Type',
      },
      {
        field: 'amount_granted',
        header: 'Amount Granted',
      },
      {
        field: 'interest_rate',
        header: 'Interest Rate',
      },
      {
        field: 'loan_status',
        header: 'Loan Status',
      },
      {
        field: 'arrears',
        header: 'Arrears',
      },

      {
        field: 'due_date',
        header: 'Mode of Payment',
      },

      { field: 'rectified_on', header: 'Rectified On' },
    ];
  }
}
