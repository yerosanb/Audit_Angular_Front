export class ReportByGeneralDormantInactiveAccount {
  id?: any;
  case_number?: String;
  branch_name?: String;
  audit_finding_status?: String;
  rectified_on?: Date;
  audit_report_date?: Date;
  audit_finding?: String;
  audit_impact?: String;
  auditor_recommendation?: String;

  account_number?: string;
  account_name?: string;
  // deactivated_date?: Date;
  amount?: number;
  // entry_passed_by?: string;
  // entry_approved_by?: string;
  // account_type?: string;

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
