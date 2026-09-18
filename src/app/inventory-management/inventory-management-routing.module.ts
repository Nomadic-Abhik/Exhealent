import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InventoryManagementComponent } from './inventory-management.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryManagementRoutingModule { }
