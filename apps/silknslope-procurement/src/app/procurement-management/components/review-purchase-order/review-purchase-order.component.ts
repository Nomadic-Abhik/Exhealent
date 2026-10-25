import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PurchaseOrder } from '../../models/purchase-order.model';

@Component({
  selector: 'procurement-review-purchase-order',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './review-purchase-order.component.html',
  styleUrl: './review-purchase-order.component.scss'
})
export class ReviewPurchaseOrderComponent {
  @Input() orders: PurchaseOrder[] = [];
}
