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

export interface PurchaseOrderDetails {
  supplier: string;
  process: string;
  productCode: string;
  productName: string;
  productCategory: string;
  productWeight: number;
  quantity: number;
  batchNumber: string;
  batchEntryDate: string;
  price: number;
  deliveryMiscCharge: number;
  totalTax: number;
  miscCharge: number;
  totalProcurementCost: number;
}

export interface PurchaseOrder {
  orderNumber: string;
  supplier: PurchaseOrderDetails['supplier'];
  process: PurchaseOrderDetails['process'];
  productCode: PurchaseOrderDetails['productCode'];
  productName: PurchaseOrderDetails['productName'];
  productCategory: PurchaseOrderDetails['productCategory'];
  productWeight: PurchaseOrderDetails['productWeight'];
  quantity: PurchaseOrderDetails['quantity'];
  batchNumber: PurchaseOrderDetails['batchNumber'];
  batchEntryDate: PurchaseOrderDetails['batchEntryDate'];
  price: PurchaseOrderDetails['price'];
  deliveryMiscCharge: PurchaseOrderDetails['deliveryMiscCharge'];
  totalTax: PurchaseOrderDetails['totalTax'];
  miscCharge: PurchaseOrderDetails['miscCharge'];
  totalProcurementCost: PurchaseOrderDetails['totalProcurementCost'];
  status: 'Open';
  createdAt: string;
}
