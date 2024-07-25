export class ReportResponse {
  id?: any;
  case_number?: String;
  branch_name?: String;
  region_name?: String;
  audit_period?: String;
  audit_finding?: String;

  audit_impact?: String;
  auditor_recommendation?: String;
  auditee_response?: String;
  audit_finding_status?: String;

  card_issued_branch?: number;
  card_distributed_to_customer?: number;
  return_to_card_issuance_unit?: number;
  remaining_card_at_branch?: number;

  audit_report_date?: Date;
  rectified_on?: Date;

  static getHeaders(): any[] {
    return [
      { field: 'case_number', header: 'Case Number' },
      { field: 'branch_name', header: 'Branch Name' },
      { field: 'audit_period', header: 'Audit Period' },
      { field: 'region_name', header: 'Region Name' },
      { field: 'audit_finding', header: 'Audit Finding' },
      { field: 'audit_impact', header: 'Audit Impact' },
      { field: 'auditor_recommendation', header: 'Auditor Recommendation' },
      { field: 'auditee_response', header: 'Auditee Response' },
      { field: 'audit_finding_status', header: 'Audit Finding Status' },
      { field: 'card_issued_branch', header: 'Card Issued Branch' },
      {
        field: 'card_distributed_to_customer',
        header: 'Card Distributed to Customer',
      },
      {
        field: 'return_to_card_issuance_unit',
        header: 'Return to Card Issuance Unit',
      },
      { field: 'remaining_card_at_branch', header: 'Remaining Card at Branch' },
      { field: 'audit_report_date', header: 'Audit Report Date' },
      { field: 'rectified_on', header: 'Rectified On' },
    ];
  }
}


