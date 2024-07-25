import { User } from "app/models/admin/user";
export class ChangeTrackerISM {
  id?: Number;
  changer?: User;
  change?: String;
  audit_id?: Number;
  change_date?: String;
  content_type?:String;
  role?:String;
  icon?:any;
  color?:any;
}
