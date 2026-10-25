import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { RemoteUnavailableComponent } from './remote-unavailable.component';

function loadRemoteRoutes(remoteName: string): Promise<Routes> {
  return loadRemoteModule(remoteName, './Routes')
    .then((remote) => remote['routes'] as Routes)
    .catch((error: unknown) => {
      console.error(`Unable to load the "${remoteName}" remote.`, error);
      return [{ path: '**', component: RemoteUnavailableComponent }];
    });
}

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((module) => module.DashboardModule)
  },
  {
    path: 'distributors',
    loadChildren: () => loadRemoteRoutes('silknslopeDistributor')
  },
  {
    path: 'procurement',
    loadChildren: () => loadRemoteRoutes('silknslopeProcurement')
  },
  {
    path: 'inventory',
    loadChildren: () => loadRemoteRoutes('silknslopeInventory')
  },
  {
    path: 'orders',
    loadChildren: () => loadRemoteRoutes('silknslopeOrder')
  },
  { path: '**', redirectTo: 'dashboard' }
];
