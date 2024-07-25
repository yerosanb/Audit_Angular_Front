import { Region } from "app/models/admin/region";
import { User } from "app/models/admin/user";
import { CompiledBranchAudit } from "./compiled-branch-audit";
import { ChangeTrackerBranchAudit } from "./change-tracker-branch-audit";

export class CompiledRegionalAudit {
  id?: Number;
  compiler?: User;
  approver?: User;
  audit_type?: String;
  finding?: String;
  impact?: String;
  approve_status?: Boolean;
  review_status?: Boolean;
  approved_date?: String;
  reviewed_date?: String;
  recommendation?: String;
  compiled_date?: String;
  compiled_status?: Boolean;
  compiled_audits?: Number[];
  compiledBranchAudits: CompiledBranchAudit[] = [];
  change_tracker_branch_audit: ChangeTrackerBranchAudit[] = [];
  oustanding_date?: number

}
