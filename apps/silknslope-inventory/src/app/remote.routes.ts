import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inventory-management' },
  {
    path: 'inventory-management',
    loadChildren: () => import('./inventory-management/inventory-management.module')
      .then((module) => module.InventoryManagementModule)
  },
  {
    path: 'sku-management',
    loadChildren: () => import('./sku-management/sku-management.module')
      .then((module) => module.SkuManagementModule)
  }
];
