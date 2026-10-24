export interface ProductMasterItem {
  code: string;
  name: string;
  categoryCode: string;
  processCode: string;
}

export interface ProcessMasterItem {
  code: string;
  name: string;
}

export interface CategoryMasterItem {
  code: string;
  name: string;
}

export interface InventoryRecord {
  process: string;
  productCode: string;
  productName: string;
  productCategory: string;
  productWeight: number;
  quantity: number;
  batchNumber: string;
  batchEntryDate: string;
  mrp: number;
  currentDiscount: number;
}
