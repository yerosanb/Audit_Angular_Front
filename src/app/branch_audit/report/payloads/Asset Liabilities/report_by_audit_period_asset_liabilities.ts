export class ReportByAuditPeriodAssetLiability {
  [x: string]: any;
  id?: any;
  case_number?: String;
  audit_period?: String;
  branch_name?: String;
  audit_finding?: String;
  // card_issued_branch?: String;
  // card_distributed_to_customer?: String;
  // return_to_card_issuance_unit?: String;
  // remaining_card_at_branch?: String;
  asset_amount?: number;
  liability_amount?: number;
  difference?: number;

  audit_impact?: String;
  auditor_recommendation?: String;
  auditee_response?: String;
  audit_finding_status?: String;
  rectified_on?: Date;

  static getHeaders(): any[] {
    return [
      { field: 'case_number', header: 'Case Number' },
      { field: 'audit_period', header: 'Audit Period' },
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'audit_finding', header: 'Audit Finding' },
      { field: 'audit_impact', header: 'Audit Impact' },
      { field: 'auditor_recommendation', header: 'Auditor Recommendation' },
      { field: 'auditee_response', header: 'Auditee Response' },
      { field: 'audit_finding_status', header: 'Audit Finding Status' },

      { field: 'asset_amount', header: 'Asset Amount' },
      { field: 'liability_amount', header: 'Liability Amount' },
      { field: 'difference', header: 'Difference' },
      // { field: 'card_issued_branch', header: 'Card Issued Branch' },
      // {
      //   field: 'card_distributed_to_customer',
      //   header: 'Card Distributed to Customer',
      // },
      // {
      //   field: 'return_to_card_issuance_unit',
      //   header: 'Return to Card Issuance Unit',
      // },
      // { field: 'remaining_card_at_branch', header: 'Remaining Card at Branch' },
      { field: 'rectified_on', header: 'Rectified On' },
    ];
  }
}
