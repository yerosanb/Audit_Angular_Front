export class ByDateRange {
    [x: string]: any;
    id?: any;
    audit_report_date?: Date;
    branch_name?: String;
    audit_finding?: String;
  
    audit_impact?: String;
    auditor_recommendation?: String;
    auditee_response?: String;
    audit_finding_status?: String;
    rectified_on?: Date;
  
    static getHeaders(): any[] {
      return [
        { field: 'audit_report_date', header: 'Date' },
        { field: 'branch_name', header: 'Branch Name' },
        { field: 'audit_finding', header: 'Audit Finding' },
        { field: 'audit_impact', header: 'Audit Impact' },
        { field: 'auditor_recommendation', header: 'Auditor Recommendation' },
        { field: 'auditee_response', header: 'Auditee Response' },
        { field: 'audit_finding_status', header: 'Audit Finding Status' },
       
      ];
    }
}
