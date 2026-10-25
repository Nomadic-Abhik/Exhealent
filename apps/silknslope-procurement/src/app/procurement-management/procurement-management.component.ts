import { Component, signal } from '@angular/core';
import { CreatePurchaseOrderComponent } from './components/create-purchase-order/create-purchase-order.component';
import { ReviewPurchaseOrderComponent } from './components/review-purchase-order/review-purchase-order.component';
import { ReviewPurchaseOrderHistoryComponent } from './components/review-purchase-order-history/review-purchase-order-history.component';
import {
  CategoryMasterItem,
  ProcessMasterItem,
  ProductMasterItem,
  PurchaseOrder,
  PurchaseOrderDetails
} from './models/purchase-order.model';

@Component({
  selector: 'procurement-management',
  standalone: true,
  imports: [
    CreatePurchaseOrderComponent,
    ReviewPurchaseOrderComponent,
    ReviewPurchaseOrderHistoryComponent
  ],
  templateUrl: './procurement-management.component.html',
  styleUrl: './procurement-management.component.scss'
})
export class ProcurementManagementComponent {
  readonly supplierList = ['SunBlessed', 'Millate', 'Tista Valley'];

  readonly productMasterList: ProductMasterItem[] = [
    { code: 'FDA-100', name: 'Silk & Slope Gold', categoryCode: 'CAT-001', processCode: 'PROC-001' },
    { code: 'FDA-7030', name: 'Silk & Slope Silver', categoryCode: 'CAT-001', processCode: 'PROC-002' },
    { code: 'EGA-100', name: 'Silk & Slope Bronze', categoryCode: 'CAT-001', processCode: 'PROC-003' },
    { code: 'EGA-70', name: 'Silk & Slope Copper', categoryCode: 'CAT-001', processCode: 'PROC-004' }
  ];
  readonly productCodeMasterList = this.productMasterList.map((product) => product.code);

  readonly processMasterList: ProcessMasterItem[] = [
    { code: 'PROC-001', name: 'Fridge Dried' },
    { code: 'PROC-002', name: 'AggloMeration Enhanced' },
    { code: 'PROC-003', name: 'Agglomeration Normal' },
    { code: 'PROC-004', name: 'Plantation - A' }
  ];

  readonly categoryMasterList: CategoryMasterItem[] = [
    { code: 'CAT-001', name: 'Instant Coffee' }
  ];

  readonly purchaseOrders = signal<PurchaseOrder[]>([]);
  private orderSequence = 0;

  createPurchaseOrder(details: PurchaseOrderDetails): void {
    this.orderSequence += 1;
    this.purchaseOrders.update((orders) => [
      {
        ...details,
        orderNumber: `PO-${Date.now().toString().slice(-8)}-${this.orderSequence}`,
        status: 'Open',
        createdAt: new Date().toISOString()
      },
      ...orders
    ]);
  }
}
