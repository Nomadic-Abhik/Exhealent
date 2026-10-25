import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InventoryManagementRoutingModule } from './inventory-management-routing.module';
import { InventoryManagementComponent } from './inventory-management.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ReviewInventoryComponent } from './components/review-inventory/review-inventory.component';

@NgModule({
  declarations: [
    InventoryManagementComponent,
    AddProductComponent,
    ReviewInventoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InventoryManagementRoutingModule
  ]
})
export class InventoryManagementModule { }
