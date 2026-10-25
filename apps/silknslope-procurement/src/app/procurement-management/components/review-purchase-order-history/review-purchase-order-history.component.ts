import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PurchaseOrder } from '../../models/purchase-order.model';

@Component({
  selector: 'procurement-review-purchase-order-history',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './review-purchase-order-history.component.html',
  styleUrl: './review-purchase-order-history.component.scss'
})
export class ReviewPurchaseOrderHistoryComponent {
  @Input() orders: PurchaseOrder[] = [];
}
