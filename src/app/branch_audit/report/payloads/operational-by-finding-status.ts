export class OperationalByFindingStatus {
    [x: string]: any;
    id?: any;
    branch_name?: String;
    audit_finding?: String;
    amount?: String;
    // account_number?: String;
    // account_holder_nmae?: String;
    audit_impact?: String;
    auditor_recommendation?: String;
    auditee_response?: String;
    audit_finding_status?: String;
    rectified_on?: Date;
    fcy?: String;
  
    static getHeaders(): any[] {
      return [
        { field: 'branch_name', header: 'Branch Name' },
        { field: 'audit_finding', header: 'Audit Finding' },
        { field: 'audit_impact', header: 'Audit Impact' },
        { field: 'auditor_recommendation', header: 'Auditor Recommendation' },
        { field: 'auditee_response', header: 'Auditee Response' },
        { field: 'audit_finding_status', header: 'Audit Finding Status' },
        { field: 'amount', header: 'Amount' },

        // {
        //   field: 'account_number',
        //   header: 'Account Number',
        // },
        // {
        //   field: 'account_holder_name',
        //   header: 'Account Holder',
        // },
        { field: 'rectified_on', header: 'Rectified On' },
        { field: 'fcy', header: 'Fcy' },

      ];
    }
}
