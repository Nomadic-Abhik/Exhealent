import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
      .then((m) => m.DashboardModule)
  },
  {
    path: 'inventory-management',
    loadChildren: () => import('./inventory-management/inventory-management.module')
      .then((m) => m.InventoryManagementModule)
  },
  {
    path: 'distributor-management',
    loadChildren: () => import('./distributor-management/distributor-management.module')
      .then((m) => m.DistributorManagementModule)
  },
  {
    path: 'sku-management',
    loadChildren: () => import('./sku-management/sku-management.module')
      .then((m) => m.SkuManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
