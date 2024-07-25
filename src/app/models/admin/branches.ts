import { User } from "../admin/user";
import { Region } from "./region";

export class Branches {
    id?:any;
    name?:string;
    code?:string;
    region?:Region;
    status?:boolean;
    user_id?:number;
}

