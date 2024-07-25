export class ReportByAmountAbnormalBalance {
  id?: any;
  audit_report_date?: Date;
  branch_name?: String;
  audit_finding?: String;

  // account_affected?: string;
  debit_amount?: Number;
  credit_amount?: Number;
  difference_amount?: Number;

  audit_impact?: String;
  auditor_recommendation?: String;
  auditee_response?: String;
  audit_finding_status?: String;
  rectified_on?: Date;

  [x: string]: any;

  static getHeaders(): any[] {
    return [
      { field: 'audit_report_date', header: 'Date' },
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'audit_finding', header: 'Audit Finding' },
      { field: 'audit_impact', header: 'Audit Impact' },
      { field: 'auditor_recommendation', header: 'Auditor Recommendation' },
      { field: 'auditee_response', header: 'Auditee Response' },
      { field: 'audit_finding_status', header: 'Audit Finding Status' },

      { field: 'credit_amount', header: 'Credit Amount' },
      { field: 'debit_amount', header: 'Debit Amount' },
      // { field: 'account_affected', header: 'Account Affected' },
      { field: 'difference_amount', header: 'Difference Affected' },
      { field: 'rectified_on', header: 'Rectified On' },
    ];
  }
}
