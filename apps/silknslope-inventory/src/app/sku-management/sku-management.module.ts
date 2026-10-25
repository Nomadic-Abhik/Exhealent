import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SkuManagementRoutingModule } from './sku-management-routing.module';
import { SkuManagementComponent } from './sku-management.component';
import { AddSkuComponent } from './components/add-sku/add-sku.component';
import { EditSkuComponent } from './components/edit-sku/edit-sku.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ReviewProductComponent } from './components/review-product/review-product.component';
import { AddProcessComponent } from './components/add-process/add-process.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';

@NgModule({
  declarations: [
    SkuManagementComponent,
    AddSkuComponent,
    EditSkuComponent,
    AddProductComponent,
    ReviewProductComponent,
    AddProcessComponent,
    AddCategoryComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, SkuManagementRoutingModule]
})
export class SkuManagementModule {}
