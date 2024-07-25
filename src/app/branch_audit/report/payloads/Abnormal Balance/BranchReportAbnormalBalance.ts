import { Branches } from 'app/models/admin/branches';
import { Region } from 'app/models/admin/region';
import { BranchesR } from '../branchesR';


export class BranchReportAbnormalBalance {
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
  [key: string]: any;

  account_affected?: string;
  debit_amount_min?: number;
  debit_amount_max?: number;
  credit_amount_min?: number;
  credit_amount_max?: number;
  cash_type?: string;

  
  regional_compiler_compiled_date?: string[];
  division_compiler_compiled_date?: string[];
  approved_date?: string[];

}
