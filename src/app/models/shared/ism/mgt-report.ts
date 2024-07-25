import { Branches } from 'app/models/admin/branches';

export class MgtReport {
  directorate?: Branches;
  division?: Branches;
  risk_level?: String;
  audit_period?: string[];
  rectification_status?: Boolean;
  finding_status?: String;
  finding?:String;
  category?: String;
  rectification_date?: string[];
  amount?: Number[];
}
