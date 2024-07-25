export class NegotiableByRegion {
  [x: string]: any;
  id?: any;
  region_name?: String;
  audit_finding?: String;

  amount?: number;
  unit_price?: number;
  trial_balance_amount?: number;
  difference?: number;
  stock_type?: String;
  // quantity?: number;

  audit_impact?: String;
  auditor_recommendation?: String;
  auditee_response?: String;
  audit_finding_status?: String;
  rectified_on?: Date;

  static getHeaders(): any[] {
    return [
      { field: 'region_name', header: 'Region Name' },
      { field: 'audit_finding', header: 'Audit Finding' },
      { field: 'audit_impact', header: 'Audit Impact' },
      { field: 'auditor_recommendation', header: 'Auditor Recommendation' },
      { field: 'auditee_response', header: 'Auditee Response' },
      { field: 'audit_finding_status', header: 'Audit Finding Status' },

      { field: 'amount', header: 'Amount' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'trial_balance_amount', header: 'Trial Balance' },
      { field: 'difference', header: 'Difference' },
      { field: 'unit_price', header: 'Unit Price' },
      {
        field: 'stock_type',
        header: 'Stock Item Type',
      },

      { field: 'rectified_on', header: 'Rectified On' },
    ];
  }
}
