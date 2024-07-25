
import { Branches } from "app/models/admin/branches";
import { OverDraft } from "../overdraft/over-draft";

export class LoanAndAdvance {
id?: Number;
loan_disbursed_date?: String;
account_number?: Number;
borrower_name?: String;
loan_type?: String;
amount_granted?: number;
interest_rate?: Number;
due_date?: String;
arrears?: Number;
loan_status?: String;
branch?:Branches;
overDraft?: OverDraft = {};
fcy?: String;
cash_type?:String
category ?: String
over_draft_id?:number


}
