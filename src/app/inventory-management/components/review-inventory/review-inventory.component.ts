import { Component, EventEmitter, Input, Output } from '@angular/core';

import { InventoryRecord } from '../../inventory.models';

@Component({
  selector: 'app-review-inventory',
  templateUrl: './review-inventory.component.html',
  styleUrls: ['./review-inventory.component.scss']
})
export class ReviewInventoryComponent {
  @Input() inventoryRecords: InventoryRecord[] = [];
  @Output() remove = new EventEmitter<number>();

  currentStock(productCode: string): number {
    return this.inventoryRecords
      .filter((record) => record.productCode === productCode)
      .reduce((total, record) => total + record.quantity, 0);
  }
}
