import { NegotiableStockItem } from '../negotiable_stock_item/negotiable-stock-item';

export class NegotiableInstrument {
  id?: Number;
  branch_audit_id?: Number;
  account_holder?: String;
  account_number?: String;
  printed_date?: String;
  amount?: number;
  difference?: number;
  category?: String;
  ck_type?: String;
  ck_range?: string;
  ck_ranges?: String[];
  quantity?: number;
  unit_price?: number;
  trial_balance?: number;
  action_taken?: number;
  negotiable_stock_item_id?: number;
  negotiableStockItem?: NegotiableStockItem = {};
  cash_type?: String;
  fcy?: String;
}
