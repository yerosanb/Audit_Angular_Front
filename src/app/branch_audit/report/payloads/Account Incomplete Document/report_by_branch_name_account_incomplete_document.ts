export class ReportByBranchNameIncompleteDocument {
  [x: string]: any;
  id?: any;

  case_number?: String;
  branch_name?: String;
  audit_finding?: String;

  // account_type?: string;
  customer_name?: string;
  account_number?: string;
  // account_opened_date?: string;
  account_opened_amount?: number;
  // opened_by?: string;
  // approved_by?: string;

  audit_impact?: String;
  auditor_recommendation?: String;
  auditee_response?: String;
  audit_finding_status?: String;
  rectified_on?: Date;

  static getHeaders(): any[] {
    return [
      { field: 'case_number', header: 'Case Number' },
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'audit_finding', header: 'Audit Finding' },
      { field: 'audit_impact', header: 'Audit Impact' },
      { field: 'auditor_recommendation', header: 'Auditor Recommendation' },
      { field: 'auditee_response', header: 'Auditee Response' },
      { field: 'audit_finding_status', header: 'Audit Finding Status' },

      // { field: 'account_type', header: 'Account Type' },
      { field: 'customer_name', header: 'Customer Name' },
      { field: 'account_number', header: 'Account Number' },
      // { field: 'account_opened_date', header: 'Account Opened Date' },
      { field: 'account_opened_amount', header: 'Amount Withdraw' },
      // { field: 'opened_by', header: 'Opened By' },
      // { field: 'approved_by', header: 'Approved By' },

      { field: 'rectified_on', header: 'Rectified On' },
    ];
  }
}
