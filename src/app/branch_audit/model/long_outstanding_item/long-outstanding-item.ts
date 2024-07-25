export class LongOutstandingItem {
  id?: number;
  branch_audit_id?: number;
  outstanding_item?: string;
  less_than_90_amount?: number = 0;
  less_than_90_number?: number = 0;
  greater_than_90_amount?: number = 0;
  greater_than_90_number?: number = 0;
  greater_than_180_amount?: number = 0;
  greater_than_180_number?: number = 0;
  greater_than_365_amount?: number = 0;
  greater_than_365_number?: number = 0;
  trial_balance?: number = 0;
  total_amount?: number = 0;
  difference?: number;
  justification?: string;
  cash_type?: string;
  fcy?: string;
  selected_items_age?: String[] = [];
  selected_item_age?: String;
}
