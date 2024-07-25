import { User } from "../admin/user";

export class FraudCase {

id?:number;
format?: any;
initial?: number;
created_date?: string
case_type?: string;
updated_date?:string;
user: User;
status?: Boolean
approver?:User;
fraud_status?: number;
}
