import { User } from "app/models/admin/user";

export class CommonFinding {

    id?: number;
    content?: string;
    created_date?: string
    modified_date?: string;
    user?: User
    identifier?: string;
}
