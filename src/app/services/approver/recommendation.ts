import { User } from "app/models/admin/user";

export class Recommendation {
 id?: number;
 content?:String
 created_date?:String
 modified_date?:String;
 user:User;
 identifier?: string;
}
