import { Component } from '@angular/core';
import { CategoryMasterItem, InventoryRecord, ProcessMasterItem, ProductMasterItem } from './inventory.models';

@Component({
    selector: 'app-inventory-management',
    templateUrl: './inventory-management.component.html',
    styleUrls: ['./inventory-management.component.scss'],
    standalone: false
})
export class InventoryManagementComponent {
  // Replace this local catalog with the product master-list service when available.
  readonly productMasterList: ProductMasterItem[] = [
    { code: 'FDA-100', name: 'Silk & Slope Gold', categoryCode: 'CAT-001', processCode: 'PROC-001' },
    { code: 'FDA-7030', name: 'Silk & Slope Silver', categoryCode: 'CAT-001', processCode: 'PROC-002' },
    { code: 'EGA-100', name: 'Silk & Slope Bronze', categoryCode: 'CAT-001', processCode: 'PROC-003' },
    { code: 'EGA-70', name: 'Silk & Slope Copper', categoryCode: 'CAT-001', processCode: 'PROC-004' }
  ];

  readonly productNameMasterList = this.productMasterList.map((product) => product.name);
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

  inventoryRecords: InventoryRecord[] = [];

  addInventory(record: InventoryRecord): void {
    this.inventoryRecords = [
      record,
      ...this.inventoryRecords
    ];
  }

  removeInventory(index: number): void {
    this.inventoryRecords = this.inventoryRecords.filter((_, recordIndex) => recordIndex !== index);
  }

}
