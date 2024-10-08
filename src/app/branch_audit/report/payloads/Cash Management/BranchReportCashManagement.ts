import { Branches } from 'app/models/admin/branches';
import { Region } from 'app/models/admin/region';
import { BranchesR } from '../branchesR';

export class BranchReportCashManagement {
  region?: Region;
  // region_id?: number;
  branch?: BranchesR;
  // branch_id?: number;
  finding_status?: String;
  rectification_date_range?: string[];
  date_range?: string[];
  audit_finding?: string;
  // category_of_discrepancy?: string;
  // amount_min?: Number;
  // amount_max?: Number;

  ing?: string;
  rectification_status?: string;
  single_filter_info?: string;
  user_id?: number;
  user_roles?: string[];
  // user_branch_id?: number;
  user_region_id?: number;
  [key: string]: any;

  // account_affected?: string;
  // debit_amount_min?: Number;
  // debit_amount_max?: Number;
  // credit_amount_min?: Number;
  // credit_amount_max?: Number;

  // account_name?: string;
  mid_rate_fcy_min?: number;
  mid_rate_fcy_max?: number;
  average_cash_holding_min?: number;
  average_cash_holding_max?: number;
  cash_type?: string;

  regional_compiler_compiled_date?: string[];
  division_compiler_compiled_date?: string[];
  approved_date?: string[];
}
