export class ReportByGeneralCashExcessOrShortage {
  id?: any;
  case_number?: String;
  branch_name?: String;
  audit_finding_status?: String;
  rectified_on?: Date;
  audit_report_date?: Date;
  audit_finding?: String;
  audit_impact?: String;
  auditor_recommendation?: String;

  amount_shortage?: number;
  amount_excess?: number;
  action_taken?: string;
  accountable_staff?: String;

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

      { field: 'amount_shortage', header: 'Amount Shortage' },
      { field: 'amount_excess', header: 'Amount Excess' },
      { field: 'action_taken', header: 'Action Taken' },
      { field: 'accountable_staff', header: 'Accountable Staff' },


      { field: 'rectified_on', header: 'Rectified On' },
    ];
  }
}
