import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AddDistributorComponent } from './components/add-distributor/add-distributor.component';
import { DistributorManagementRoutingModule } from './distributor-management-routing.module';
import { DistributorManagementComponent } from './distributor-management.component';

@NgModule({
  declarations: [
    DistributorManagementComponent,
    AddDistributorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DistributorManagementRoutingModule
  ]
})
export class DistributorManagementModule { }
