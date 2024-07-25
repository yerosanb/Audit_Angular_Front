export class NegotiableByAmount {
  id?: any;
  [x: string]: any;
  branch_name?: String;
  audit_report_date?: Date;
  audit_finding?: String;
  audit_impact?: String;
  auditor_recommendation?: String;

  amount?: number;
  unit_price?: number;
  trial_balance_amount?: number;
  difference?: number;
  stock_type?: String;

  auditee_response?: String;
  audit_finding_status?: String;
  rectified_on?: Date;

  static getHeaders(): any[] {
    return [
      { field: 'audit_report_date', header: 'Date' },
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
      { field: 'rectified_on', header: 'Rectified On' },
    ];
  }
}
