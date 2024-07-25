import { User } from "app/models/admin/user";
import { Audit_ISM } from "app/models/auditor/audit_ISM";

export class Remark {
    id?: Number;
    audit?: Audit_ISM;
    sender?: User;
    reciever?: User;
    message?: String;
    remark_date?: String;
    status?:Number;
    rejected?:Boolean;
}
