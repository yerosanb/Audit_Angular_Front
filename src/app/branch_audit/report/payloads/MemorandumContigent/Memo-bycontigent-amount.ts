export class MemoBYContigentAmount {
    id?: any;
    case_number?: String;
    branch_name?: String;
    audit_finding_status?: String;
    rectified_on?: Date;
    audit_report_date?: Date;
    audit_finding?: String;
    audit_impact?: String;
  auditor_recommendation?: String;
  
    memorandum_amount?: number;
    contingent_amount?: number;
    difference?: number;

    //difference?:Number;
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
        { field: 'memorandom_amount', header: 'Memorandom Amount' },
        {
          field: 'contingent_amount',
          header: 'Contingent Amount',
        },
        { field: 'Difference', header: 'difference' },

        // {
        //   field: 'difference',
        //   header: 'Difference',
        // },
      ];
    }
}
