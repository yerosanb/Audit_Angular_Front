import { OperationalDescripancyCategory } from "./operational-descripancy-category";

export class OperationalDescripancyBranch {

    id?: Number;
    branch_audit_id?: Number;
    operational_descripancy_category_id?: Number;
    acount_holder_name?: String;
    account_number?: String;
    transaction_date?: String;
    amount?: number;
    operationalDescripancyCategory?:  OperationalDescripancyCategory={};
    cash_type?:String;
    fcy?:String;
    operational_category?:String;

}
