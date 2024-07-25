import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';

export class OperationalDescripancyPooledData {
  id?: Number;
  branchFinancialAudits?: BranchFinancialAudit[];
  audit?: BranchFinancialAudit;
  branch_financial_audit_id?: Number;
  pooled_date?: String;
  cash_type?: String;
  fcy?: String;
  status?: Boolean;
  pool_amount?: number;
  pooler?: Number;
}
