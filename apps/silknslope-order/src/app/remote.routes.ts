import { Routes } from '@angular/router';
import { OrderPlaceholderComponent } from './order-placeholder.component';

export const routes: Routes = [
  { path: '', component: OrderPlaceholderComponent },
  { path: '**', redirectTo: '' }
];
