import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PastOrder } from '../../models/order.model';

@Component({
  selector: 'orders-past-orders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './past-orders.component.html',
  styleUrl: './past-orders.component.scss'
})
export class PastOrdersComponent {
  @Input({ required: true }) orders: PastOrder[] = [];
}
