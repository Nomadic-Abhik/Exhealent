import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'distributor-management' },
  {
    path: 'distributor-management',
    loadChildren: () => import('./distributor-management/distributor-management.module')
      .then((module) => module.DistributorManagementModule)
  }
];
