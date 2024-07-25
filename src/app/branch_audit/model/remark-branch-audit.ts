import { CompiledRegionalAudit } from './compiled-regional-audit';
import { User } from "app/models/admin/user";
import { BranchFinancialAudit } from "./branch-financial-audit";
import { CompiledBranchAudit } from "./compiled-branch-audit";

export class RemarkBranchAudit {
  id?: Number;
  branchFinancialAudit?: BranchFinancialAudit;
  compiledBranchAudit?: CompiledBranchAudit;
  compiledRegionalAudit?: CompiledRegionalAudit;
  sender?: User;
  reciever?: User;
  message?: String;
  remark_date?: String;
  status?:Number;
  rejected?:Boolean;
}
