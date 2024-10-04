import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component';
import { DemoNgZorroAntdModule } from '../../DemoNgZorroAntModule';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    GetBookingsComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoNgZorroAntdModule,
  ]
})
export class AdminModule { }
