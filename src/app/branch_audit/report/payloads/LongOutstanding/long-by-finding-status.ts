export class LongByFindingStatus {
  [x: string]: any;
    id?: any;
    branch_name?: String;
    audit_finding?: String;


    less_than_90_amount?: number;
    greater_than_90_amount?: number;
    greater_than_180_amount?: number;
    greater_than_365_amount?: number;

    less_than_90_number?: number;
    greater_than_90_number?: number;
    greater_than_180_number?: number;
    greater_than_365_number?: number;

    trial_balance?: number;
    total_amount?: number;
    difference?: number;

    audit_impact?: String;
    auditor_recommendation?: String;
    auditee_response?: String;
    audit_finding_status?: String;
    rectified_on?: Date;

    static getHeaders(): any[] {
      return [
        { field: 'branch_name', header: 'Branch Name' },
        { field: 'audit_finding', header: 'Audit Finding' },
        { field: 'audit_impact', header: 'Audit Impact' },
        { field: 'auditor_recommendation', header: 'Auditor Recommendation' },
        { field: 'auditee_response', header: 'Auditee Response' },
        { field: 'audit_finding_status', header: 'Audit Finding Status' },

        { field: 'less_than_90_amount', header: 'Less Than 90 Amount' },
        { field: 'greater_than_90_amount', header: 'Greater Than 90 Amount' },
        { field: 'greater_than_180_amount', header: 'Greater Than 180 Amount' },
        { field: 'greater_than_365_amount', header: 'Greater Than 365 Amount' },

        { field: 'less_than_90_number', header: 'Less Than 90 Number' },
        { field: 'greater_than_90_number', header: 'Greater Than 90 Number' },
        { field: 'greater_than_180_number', header: 'Greater Than 180 Number' },
        { field: 'greater_than_365_number', header: 'Greater Than 365 Number' },

        { field: 'trial_balance', header: 'Trial Amount' },
        { field: 'total_amount', header: 'Total Amount' },
        { field: 'difference', header: 'Difference' },

        { field: 'rectified_on', header: 'Rectified On' },

      ];
    }
}
