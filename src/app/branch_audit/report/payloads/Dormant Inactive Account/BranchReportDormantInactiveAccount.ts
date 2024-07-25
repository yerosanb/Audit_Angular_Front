import { Branches } from 'app/models/admin/branches';
import { Region } from 'app/models/admin/region';
import { BranchesR } from '../branchesR';

export class BranchReportDormantInactiveAccount {
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
  banking?: string;
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
  account_number?: string;
  amount_min?: number;
  amount_max?: number;
  account_type?: string;
  cash_type?: string;

  regional_compiler_compiled_date?: string[];
  division_compiler_compiled_date?: string[];
  approved_date?: string[];
}

/*
DormantInactiveAccount

  account_number?: string;
  deactivated_date?: Date;
  amount?: Number;
  entry_passed_by?: string;
  entry_approved_by?: Number;
  account_type?: Number;

        { field: 'account_number', header: 'Account Number' },
      { field: 'deactivated_date', header: 'Deactivated Date' },
      { field: 'amount', header: 'Amount' },
      { field: 'entry_passed_by', header: 'Passed By' },
      { field: 'entry_approved_by', header: 'Approved By' },
      { field: 'account_type', header: 'Account Type' },
*/
