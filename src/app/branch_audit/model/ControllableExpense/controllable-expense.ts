import { ControllableExpenseType } from "./controllable-expense-type";

export class ControllableExpense {
    id?: Number;
    branch_audit_id?: Number;
    variation?: number;
    budget_per_plan?: number;
    actual_balance?: number;
    period?: String;
    cash_type ?: String
    fcy ?: String
    controllableExpenseType?:ControllableExpenseType[] = [];

}
