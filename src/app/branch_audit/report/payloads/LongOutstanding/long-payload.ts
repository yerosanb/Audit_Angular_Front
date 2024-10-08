import { Region } from "app/models/admin/region";
import { BranchesR } from "../branchesR";

export class LongPayload {
  region?: Region;
  branch?: BranchesR;
  finding_status?: String;
  rectification_date_range?: string[];
  date_range?: string[];
  audit_finding?: string;

  ing?: string;
  rectification_status?: string;
  single_filter_info?: string;

  user_id?: number;
  type?: string;
  user_roles?: string[];
  user_region_id?: number;
  [key: string]: any;

  less_than_90_amount_min?: number;
  less_than_90_amount_max?: number;

  greater_than_90_amount_min?: number;
  greater_than_90_amount_max?: number;

  greater_than_180_amount_min?: number;
  greater_than_180_amount_max?: number;

  greater_than_365_amount_min?: number;
  greater_than_365_amount_max?: number;

  cash_type?: string;
  outstanding_item?: string;
  selected_item_age?: string;

  regional_compiler_compiled_date?: string[];
  division_compiler_compiled_date?: string[];
  approved_date?: string[];
}