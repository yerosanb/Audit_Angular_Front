export class NegotiableByGeneral {
  id?: any;

  case_number?: String;
  branch_name?: String;
  audit_finding_status?: String;
  rectified_on?: Date;
  audit_report_date?: Date;
  audit_finding?: String;
  audit_impact?: String;
  auditor_recommendation?: String;

  // account_holder_name?:String;
  date_printed?: Date;
  type_of_ck?: String;
  ck_range?: string;

  amount?: number;
  unit_price?: number;
  trial_balance_amount?: number;
  difference?: number;
  stock_type?: String;

  account_number?: String;
  account_holder_nmae?: String;
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
      { field: 'amount', header: 'Amount' },
      { field: 'trial_balance_amount', header: 'Trial Balance' },
      { field: 'difference', header: 'Difference' },
      { field: 'unit_price', header: 'Unit Price' },
      { field: 'quantity', header: 'Quantity' },
      {
        field: 'stock_type',
        header: 'Stock Item Type',
      },
      {
        field: 'account_number',
        header: 'Account Number',
      },

      {
        field: 'date_printed',
        header: 'Date Printed',
      },

      {
        field: 'type_of_ck',
        header: 'Type of Ck',
      },

      {
        field: 'ck_range',
        header: 'CK Range',
      },
      {
        field: 'account_holder_name',
        header: 'Account Holder',
      },
      { field: 'rectified_on', header: 'Rectified On' },
    ];
  }
}
