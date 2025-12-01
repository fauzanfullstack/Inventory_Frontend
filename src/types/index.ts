
// USERS
export interface User {
  id: number;
  username: string;
  full_name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

// ITEMS (MASTER)
export interface Item {
  id: number;
  part_no: string;
  name: string;
  unit_type?: string;
  conversion?: number;
  unit?: string;
  qty: number;
  aksi_centang?: boolean;

  created_by?: number | null;
  updated_by?: number | null;
  created_at?: string;
  updated_at?: string;
}

// PURCHASE REQUESTS (HEADER)
export interface PurchaseRequest {
  id: number;
  pr_number: string;
  item_id?: number | null;
  part_no?: string;
  description?: string;
  unit_type?: string;
  qty_f?: number;
  currency?: string;
  cost?: number;
  total_cost?: number;
  team?: string;
  due_date?: string;
  number?: string;
  request_by?: string;
  department?: string;
  status?: string;

  created_by?: number | null;
  updated_by?: number | null;
  created_at?: string;
  updated_at?: string;
}

// MARKETLISTS
export interface MarketList {
  id: number;
  no?: string;
  status?: string;
  open_date?: string;
  cd?: string;
  cost_center?: string;
  type_cost?: string;
  total?: number;
  notes?: string;

  created_by?: number | null;
  updated_by?: number | null;
  created_at?: string;
  updated_at?: string;
}

// RECEIVINGS (HEADER)
export interface Receiving {
  id: number;
  number: string;
  document?: string;
  status?: string;
  location?: string;
  cost_center?: string;
  supplier?: string;
  idr?: number;
  total?: number;
  notes?: string;

  created_by?: number | null;
  updated_by?: number | null;
  created_at?: string;
  updated_at?: string;
}

// STORE REQUESTS (HEADER)
export interface SRequest {
  id: number;
  number: string;
  documents?: string;
  status?: string;
  open_date?: string;
  expected_date?: string;
  cost_center?: string;
  location?: string;
  request_by?: string;
  notes?: string;

  created_by?: number | null;
  updated_by?: number | null;
  created_at?: string;
  updated_at?: string;
}

// ISSUINGS (HEADER)
export interface Issuing {
  id: number;
  number: string;
  document?: string;
  date?: string;
  status?: string;
  location?: string;
  cost_center?: string;
  request_by?: string;
  total?: number;
  notes?: string;

  created_by?: number | null;
  updated_by?: number | null;
  created_at?: string;
  updated_at?: string;
}

// PR_ITEMS
export interface PRItem {
  id: number;
  purchase_request_id: number;
  item_id?: number | null;
  part_no?: string;
  description?: string;
  unit_type?: string;
  qty: number;
  cost: number;
  subtotal?: number;
  created_at?: string;
}

// RECEIVING_ITEMS
export interface ReceivingItem {
  id: number;
  receiving_id: number;
  item_id?: number | null;
  part_no?: string;
  qty: number;
  unit_type?: string;
  price: number;
  subtotal?: number;
}

// SR_ITEMS
export interface SRItem {
  id: number;
  s_request_id: number;
  item_id?: number | null;
  part_no?: string;
  qty: number;
  unit_type?: string;
  notes?: string;
}

// ISSUING_ITEMS
export interface IssuingItem {
  id: number;
  issuing_id: number;
  item_id?: number | null;
  part_no?: string;
  qty: number;
  unit_type?: string;
  notes?: string;
   issued_by: string;
}

// VIEWS (OPTIONAL)
// STOCK BALANCE VIEW
export interface StockBalanceView {
  item_id: number;
  part_no: string;
  name: string;
  total_received: number;
  total_issued: number;
  balance: number;
}
