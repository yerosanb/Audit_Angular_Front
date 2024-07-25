import { Region } from "app/models/admin/region";
import { BranchesR } from "../branchesR";

export class CashCountPayload {
  region?: Region;
  // region_id?: number;
  branch?: BranchesR;
  // branch_id?: number;
  finding_status?: String;
  rectification_date_range?: string[];
  date_range?: string[];
  audit_finding?: string;
  category_of_discrepancy?: string;

  cash_count_type?: String;
  actual_cash_count_min?: String;
  actual_cash_count_max?: String;
  trial_balance_min?: String;
  trial_balance_max?: String;

  banking?: string;
  rectification_status?: string;
  single_filter_info?: string;
  user_id?: number;
  type?: string;
  user_roles?: string[];
  // user_branch_id?: number;
  user_region_id?: number;
  [key: string]: any;

  regional_compiler_compiled_date?: string[];
  division_compiler_compiled_date?: string[];
  approved_date?: string[];

  
}
