export class LongByGeneral {
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

  less_than_90_amount?: number;
  greater_than_90_amount?: number;
  greater_than_180_amount?: number;
  greater_than_365_amount?: number;

  less_than_90_number?: number;
  greater_than_90_number?: number;
  greater_than_180_number?: number;
  greater_than_365_number?: number;

  // account_number?: String;
  // account_holder_name?: String;
  transaction_date?: Date;

  trial_balance?: number;
  total_amount?: number;
  difference?: number;

  outstanding_item?: String;
  justification?: String;
  cash_type?: String;
  fcy?: String;


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

      { field: 'less_than_90_amount', header: 'Less Than 90 Amount' },
      { field: 'greater_than_90_amount', header: 'Greater Than 90 Amount' },
      { field: 'greater_than_180_amount', header: 'Greater Than 180 Amount' },
      { field: 'greater_than_365_amount', header: 'Greater Than 365 Amount' },

      { field: 'less_than_90_number', header: 'Less Than 90 Number' },
      { field: 'greater_than_90_number', header: 'Greater Than 90 Number' },
      { field: 'greater_than_180_number', header: 'Greater Than 180 Number' },
      { field: 'greater_than_365_number', header: 'Greater Than 365 Number' },


      { field: 'trial_balance', header: 'Trial Amount' },
      { field: 'total_amount', header: 'Total Amount' },
      { field: 'difference', header: 'Difference' },

      { field: 'outstanding_item', header: 'Outstanding Item' },
      { field: 'justification', header: 'Justification' },
      { field: 'cash_type', header: 'Cash Type' },
      { field: 'fcy', header: 'Fcy' },

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
