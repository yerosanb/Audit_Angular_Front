import { SuspenseAccountType } from "../suspense_account_type/suspense-account-type"

export class SuspenseAccount {

      id?:Number
      branch_audit_id?:Number
      tracer_date?:String
      difference?:number
      balance_per_tracer?:number
      balance_per_trial_balance?:number
      suspenseAccountType?:SuspenseAccountType[] =[]
      cash_type?: String;
      fcy?: String
}
