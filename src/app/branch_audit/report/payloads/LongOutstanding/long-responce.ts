export class LongResponce {
  id?: any;
  case_number?: String;
  branch_name?: String;
  audit_finding?: String;
  auditor_name?: String;
  audit_impact?: String;
  auditor_recommendation?: String;
  auditee_response?: String;
  audit_finding_status?: String;


  audit_report_date?: Date;
  rectified_on?: Date;


  less_than_90_amount?: number;
  greater_than_90_amount?: number;
  greater_than_180_amount?: number;
  greater_than_365_amount?: number;

  less_than_90_number?: number;
  greater_than_90_number?: number;
  greater_than_180_number?: number;
  greater_than_365_number?: number;


  outstanding_item?: String;
  justification?: String;
  trial_balance?: number;
  total_amount?: number;
  difference?: number;
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


      { field: 'audit_report_date', header: 'Audit Report Date' },
      { field: 'rectified_on', header: 'Rectified On' },

      { field: 'less_than_90_amount', header: 'Less Than 90 Amount' },
      { field: 'greater_than_90_amount', header: 'Greater Than 90 Amount' },
      { field: 'greater_than_180_amount', header: 'Greater Than 180 Amount' },
      { field: 'greater_than_365_amount', header: 'Greater Than 365 Amount' },


      { field: 'less_than_90_number', header: 'Less than 90 Number' },
      { field: 'greater_than_90_number', header: 'Greater than 90 Number' },
      { field: 'greater_than_180_number', header: 'Greater than 180 Number' },
      { field: 'greater_than_365_number', header: 'Greater than 365 Number' },




      { field: 'total_amount', header: 'Total Amount' },
      { field: 'outstanding_item', header: 'Outstanding Item' },
      { field: 'justification', header: 'Justification' },
      { field: 'trial_balance', header: 'Trial Balance' },
      { field: 'difference', header: 'Difference' },



      { field: 'cash_type', header: 'Cash Type' },
       { field: 'fcy', header: 'Fcy' },

    ];
  }
}
