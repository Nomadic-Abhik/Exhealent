import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DistributorManagementComponent } from './distributor-management.component';

const routes: Routes = [
  {
    path: '',
    component: DistributorManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributorManagementRoutingModule { }
