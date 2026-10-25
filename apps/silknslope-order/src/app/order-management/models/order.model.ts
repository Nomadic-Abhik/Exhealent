export interface Order {
  orderNumber: string;
  customer: string;
  product: string;
  quantity: number;
  deliveryDate: string;
  createdAt: string;
}

export interface PastOrder extends Order {
  completedAt: string;
}
