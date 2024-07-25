import { Branches } from 'app/models/admin/branches';
import { Region } from 'app/models/admin/region';
import { BranchesR } from '../branchesR';


export class BranchReportControllableExpense {
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

  banking?: string;
  rectification_status?: string;
  single_filter_info?: string;
  user_id?: number;
  user_roles?: string[];
  // user_branch_id?: number;
  user_region_id?: number;

  variation_min?: number;
  variation_max?: number;
  budget_per_plan_min?: number;
  budget_per_plan_max?: number;
  actual_balance_min?: number;
  actual_balance_max?: number;

  controllable_expense_type?: string;
  cash_type?: string;
  [key: string]: any;

  regional_compiler_compiled_date?: string[];
  division_compiler_compiled_date?: string[];
  approved_date?: string[];
}
