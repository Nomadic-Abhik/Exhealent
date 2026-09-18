import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inventory-management',
    pathMatch: 'full'
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
