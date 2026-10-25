import { Component, signal } from '@angular/core';
import { ManualOrderComponent } from './components/manual-order/manual-order.component';
import { ReviewOrdersComponent } from './components/review-orders/review-orders.component';
import { Order, PastOrder } from './models/order.model';

@Component({
  selector: 'orders-order-management',
  standalone: true,
  imports: [ManualOrderComponent, ReviewOrdersComponent],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.scss'
})
export class OrderManagementComponent {
  readonly currentOrders = signal<Order[]>([]);
  readonly pastOrders = signal<PastOrder[]>([]);
  private orderSequence = 0;

  createOrder(orderDetails: Omit<Order, 'orderNumber' | 'createdAt'>): void {
    const order: Order = {
      ...orderDetails,
      orderNumber: this.createOrderNumber(),
      createdAt: new Date().toISOString()
    };

    this.currentOrders.update((orders) => [order, ...orders]);
  }

  completeOrder(orderToComplete: Order): void {
    this.currentOrders.update((orders) =>
      orders.filter((order) => order.orderNumber !== orderToComplete.orderNumber)
    );
    this.pastOrders.update((orders) => [
      { ...orderToComplete, completedAt: new Date().toISOString() },
      ...orders
    ]);
  }

  private createOrderNumber(): string {
    this.orderSequence += 1;
    return `ORD-${Date.now().toString().slice(-8)}-${this.orderSequence}`;
  }
}
