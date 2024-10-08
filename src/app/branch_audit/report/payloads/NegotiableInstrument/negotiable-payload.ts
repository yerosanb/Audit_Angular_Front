import { Region } from 'app/models/admin/region';
import { BranchesR } from '../branchesR';

export class NegotiablePayload {
  region?: Region;
  branch?: BranchesR;
  finding_status?: String;
  rectification_date_range?: string[];
  date_range?: string[];
  audit_finding?: string;

  min_amount?: Number;
  max_amount?: Number;
  account_number?: Number;
  stock_item_type?: string;
  ing?: string;
  cash_type?: string;

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
