import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./order-management/order-management.module')
      .then((module) => module.OrderManagementModule)
  },
  { path: '**', redirectTo: '' }
];
