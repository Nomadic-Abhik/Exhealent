import { NgModule } from '@angular/core';
import { OrderManagementComponent } from './order-management.component';
import { OrderManagementRoutingModule } from './order-management-routing.module';

@NgModule({
  imports: [OrderManagementComponent, OrderManagementRoutingModule]
})
export class OrderManagementModule {}