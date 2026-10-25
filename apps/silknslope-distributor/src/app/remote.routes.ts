import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./distributor-management/distributor-management.module')
      .then((module) => module.DistributorManagementModule)
  }
];
