import { UserSecurity } from "./user-security";
import { Branches } from "./branches";
import { Region } from "./region";
import { Role } from "./role";
import { JobPosition } from "./job-position";

export class User {
    id?: number
    first_name?: String
    middle_name?:String;
    last_name?: String
    phone_number?: String
    email?: String
    password?: String
    status?: Boolean
    roles?:Role[]=[]
    branch? : Branches
    photoUrl?: string
    gender?: String
    user_security?:UserSecurity;
    region?: Region;
    admin_id?:Number;
    employee_id?: String;
    jobPosition?: JobPosition;
    userCopyFromHR?:any;
    category?: string;
    unseen_remark?:number;
    authenthication_media?:Boolean;
    banking?: string;
}
