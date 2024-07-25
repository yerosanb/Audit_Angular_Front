import { Region } from "app/models/admin/region";
import { BranchesR } from "../branchesR";

export class Memorundompayload {
  region?: Region;
  // region_id?: number;
  branch?: BranchesR;
  // branch_id?: number;
  finding_status?: String;
  rectification_date_range?: string[];
  date_range?: string[];
  audit_finding?: string;
  category_of_discrepancy?: string;
  // amount_min?: Number;
  // amount_max?: Number;
  memorandum_amount_min?: Number;
  contingent_amount_min?: Number;
  memorandum_amount_max?: Number;
  contingent_amount_max?: Number;

  banking?: string;
  rectification_status?: string;
  single_filter_info?: string;
  user_id?: number;
  type?: string;
  user_roles?: string[];
  // user_branch_id?: number;
  user_region_id?: number;
  [key: string]: any;
  cash_type?: string;

  regional_compiler_compiled_date?: string[];
  division_compiler_compiled_date?: string[];
  approved_date?: string[];
}
