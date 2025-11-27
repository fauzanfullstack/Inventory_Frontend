// src/types/stock_balance.ts
export interface StockBalanceView {
  item_id: number;
  part_no: string;
  name: string;
  total_received: number;
  total_issued: number;
  balance: number;
}
