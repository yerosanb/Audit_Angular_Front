import { Region } from 'app/models/admin/region';
import { User } from 'app/models/admin/user';
import { BranchFinancialAudit } from './branch-financial-audit';

export class CompiledBranchAudit {
  id?: Number;
  compiler?: User;
  region?: Region;
  audit_type?: String;
  finding?: String;
  impact?: String;
  approver_id?: Number;
  reviewer_id?: Number;
  compiler_id?: Number;
  approve_status?: Number;
  review_status?: Boolean;
  approved_date?: String;
  reviewed_date?: String;
  recommendation?: String;
  compiled_date?: String;
  compiled_status?: Boolean;
  compiled_audits?: Number[];
  compiler_submitted?: Boolean;
  division_compiler_submitted?: Boolean;
  division_compiler_status?: Boolean;
  branchFinancialAudits: BranchFinancialAudit[] = [];
  outstanding_date?: number
  compiler_submitted_date?:String;


}
