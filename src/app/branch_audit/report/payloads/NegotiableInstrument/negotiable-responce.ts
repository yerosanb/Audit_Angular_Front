export class NegotiableResponce {
  id?: any;
  case_number?: String;
  branch_name?: String;
  audit_finding?: String;
  auditor_name?: String;
  audit_impact?: String;
  auditor_recommendation?: String;
  auditee_response?: String;
  audit_finding_status?: String;

  account_number?: String;
  account_holder_name?: String;
  date_printed?: Date;
  type_of_ck?: String;
  ck_range?: string;

  // quantity?: number;
  unit_price?: number;
  amount?: number;
  trial_balance_amount?: number;
  difference?: number;
  stock_type?: String;
  
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
      { field: 'amount', header: 'Amount' },
      {
        field: 'account_number',
        header: 'Account Number',
      },

      {
        field: 'account_holder_name',
        header: 'Account Holder',
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
        field: 'quantity',
        header: 'Quantity',
      },

      {
        field: 'unit_price',
        header: 'Unit Price',
      },

      {
        field: 'amount',
        header: 'Amount',
      },

      {
        field: 'trial_balance_amount',
        header: 'Trial Balance',
      },

      {
        field: 'difference',
        header: 'Difference',
      },
      {
        field: 'stock_type',
        header: 'Stock Item Type',
      },

      { field: 'audit_report_date', header: 'Audit Report Date' },
      { field: 'rectified_on', header: 'Rectified On' },
      { field: 'cash_type', header: 'Cash Type' },
      { field: 'fcy', header: 'Fcy' },
    ];
  }
}
