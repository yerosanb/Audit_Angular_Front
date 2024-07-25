export class ReportResponseDormantInactiveAccount {
  id?: any;
  case_number?: String;
  branch_name?: String;
  region_name?: String;
  audit_finding?: String;
  auditor_name?: String;
  audit_impact?: String;
  auditor_recommendation?: String;
  auditee_response?: String;
  audit_finding_status?: String;

  account_number?: string;
  account_name?: string;
  // deactivated_date?: Date;
  amount?: number;
  // entry_passed_by?: string;
  // entry_approved_by?: string;
  // account_type?: string;

  audit_report_date?: Date;
  rectified_on?: Date;

  cash_type?: String;
  fcy?: String;

  static getHeaders(): any[] {
    return [
      { field: 'case_number', header: 'Case Number' },
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'region_name', header: 'Region Name' },
      { field: 'audit_finding', header: 'Audit Finding' },
      { field: 'auditor_name', header: 'Auditor Name' },
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

      { field: 'audit_report_date', header: 'Audit Report Date' },
      { field: 'rectified_on', header: 'Rectified On' },

      { field: 'cash_type', header: 'Cash Type' },
      { field: 'fcy', header: 'Fcy' },

    ];
  }
}
