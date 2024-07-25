import { Region } from 'app/models/admin/region';
import { BranchesR } from '../branchesR';

export class LoanPayload {
  region?: Region;
  branch?: BranchesR;
  finding_status?: String;
  rectification_date_range?: string[];
  date_range?: string[];
  audit_finding?: string;
  category_of_discrepancy?: string;
  min_amount?: Number; //this is amount garanted
  max_amount?: Number; //

  loan_disburse_date?: Date;
  account_number?: String;
  borrower_name?: String;
  loan_type?: String;
  granted_amount_min?: number;
  granted_amount_max?: number;

  cash_type?: string;
  banking?: string;
  rectification_status?: string;
  single_filter_info?: string;
  user_id?: number;
  type?: string;
  user_roles?: string[];
  user_region_id?: number;
  [key: string]: any;

  regional_compiler_compiled_date?: string[];
  division_compiler_compiled_date?: string[];
  approved_date?: string[];

}
