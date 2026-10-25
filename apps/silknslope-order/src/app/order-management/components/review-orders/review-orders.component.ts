import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Order, PastOrder } from '../../models/order.model';
import { PastOrdersComponent } from '../past-orders/past-orders.component';

type OrdersTab = 'current' | 'past';

@Component({
  selector: 'orders-review-orders',
  standalone: true,
  imports: [DatePipe, PastOrdersComponent],
  templateUrl: './review-orders.component.html',
  styleUrl: './review-orders.component.scss'
})
export class ReviewOrdersComponent {
  @Input() currentOrders: Order[] = [];
  @Input() pastOrders: PastOrder[] = [];
  @Output() readonly orderCompleted = new EventEmitter<Order>();

  readonly activeTab = signal<OrdersTab>('current');

  selectTab(tab: OrdersTab): void {
    this.activeTab.set(tab);
  }

  completeOrder(order: Order): void {
    this.orderCompleted.emit(order);
  }
}
