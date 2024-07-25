import { Branches } from "app/models/admin/branches";
import { BranchManagerFile } from "./branch-manager-file";

export class BranchManagerResponse {

    id?: Number;
    
auditee_id?:Number;
action_plan?: String;
division_id?: Number;
attached_files?:BranchManagerFile;
uploaded_files?:BranchManagerFile[];
created_date?:String;
updated_date?:String;
audit_id?:Number;
division?:Branches;
}
