export class ReportByAmountControllableExpense {
  id?: any;
  audit_report_date?: Date;
  branch_name?: String;
  audit_finding?: String;

  variation?: number;
  // period?: string;
  budget_per_plan?: number;
  actual_balance?: number;
  expense_type?: String;

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

      { field: 'variation', header: 'Variation' },
      // { field: 'period', header: 'Period' },
      { field: 'budget_per_plan', header: 'Budget Per Plan' },
      { field: 'actual_balance', header: 'Actual Balance' },
      { field: 'expense_type', header: 'Expense Type' },

      { field: 'rectified_on', header: 'Rectified On' },
    ];
  }
}
