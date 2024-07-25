import { Branches } from 'app/models/admin/branches';
import { Region } from 'app/models/admin/region';
import { BranchesR } from '../branchesR';


export class BranchReportHigherOfficials {
  region?: Region;
  branch?: BranchesR;
  module_type?: string;
  risk_level?: string;
  amount_min?: number;
  amount_max?: number;


  user_id?: number;
  user_roles?: string[];
  [key: string]: any;
}
