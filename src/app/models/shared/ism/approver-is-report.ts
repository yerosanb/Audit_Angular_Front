import { Branches } from "app/models/admin/branches";
export class ApproverISReport {
    directorate?: Branches;
    division?: Branches;
    risk_level?: string;
    audit_period?: string[];
    rectification_status?: Boolean;
    finding_status?: String;
    finding?: String;
    category?: string;
    rectification_date?: string[];
    amount?: number;
}
