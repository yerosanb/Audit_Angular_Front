export class ReportByBranchNameDormantInactiveAccount {
  [x: string]: any;
  id?: any;

  case_number?: String;
  branch_name?: String;
  audit_finding?: String;

  account_number?: string;
  account_name?: string;
  // deactivated_date?: Date;
  amount?: number;
  // entry_passed_by?: string;
  // entry_approved_by?: string;
  // account_type?: string;

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

      { field: 'account_number', header: 'Account Number' },
      { field: 'account_name', header: 'Account Holder' },
      // { field: 'deactivated_date', header: 'Deactivated Date' },
      { field: 'amount', header: 'Amount' },
      // { field: 'entry_passed_by', header: 'Passed By' },
      // { field: 'entry_approved_by', header: 'Approved By' },
      // { field: 'account_type', header: 'Account Type' },

      { field: 'rectified_on', header: 'Rectified On' },
    ];
  }
}


/*

_abnormal_balance


AbnormalBalance

  account_affected?: string;
  debit_amount?: Number;
  credit_amount?: Number;
  difference_amount?: Number;


      { field: 'credit_amount', header: 'Credit Amount' },
      { field: 'debit_amount', header: 'Debit Amount' },
      { field: 'account_affected', header: 'Account Affected' },
      { field: 'difference_amount', header: 'Difference Affected' },



*/
