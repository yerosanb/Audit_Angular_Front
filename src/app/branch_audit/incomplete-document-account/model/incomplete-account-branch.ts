import { Branches } from "app/models/admin/branches";

export class IncompleteAccountBranch {
  id?:Number;
  branch?:Branches;
  branch_audit_id?:Number;
  account_type?:String;
  customer_name?:String;
  account_number?:String;
  account_opened_date?:String;
  account_opened_amount?:number;
  opened_by?:String;
  approved_by?:String;
  fcy?:String;
}

