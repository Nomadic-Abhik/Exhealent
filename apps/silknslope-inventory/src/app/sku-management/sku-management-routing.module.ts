import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SkuManagementComponent } from './sku-management.component';

const routes: Routes = [
  {
    path: '',
    component: SkuManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkuManagementRoutingModule {}
