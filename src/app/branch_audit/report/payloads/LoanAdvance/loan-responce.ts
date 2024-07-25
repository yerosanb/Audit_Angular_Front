export class LoanResponce {
  id?: any;
  case_number?: String;
  branch_name?: String;
  audit_finding?: String;
  auditor_name?: String;
  audit_impact?: String;
  auditor_recommendation?: String;
  auditee_response?: String;
  audit_finding_status?: String;

  loan_disburse_date?: Date;
  borrower_name?: String;
  loan_type?: String;

  amount_granted?: number;
  interest_rate?: number;
  arrears?: number;
  approved_amount?: number;
  overdrawn_balance?: number;
  difference?: number;
  penality_charge_collection?: number;


  loan_status?: String;
  due_date?: string;


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
        field: 'arrears',
        header: 'Arrears',
      },
      {
        field: 'loan_status',
        header: 'Loan Status',
      },

      {
        field: 'due_date',
        header: 'Mode of Payment',
      },

      { field: 'audit_report_date', header: 'Audit Report Date' },
      { field: 'rectified_on', header: 'Rectified On' },

      { field: 'cash_type', header: 'Cash Type' },
      { field: 'fcy', header: 'Fcy' },
    ];
  }
}
