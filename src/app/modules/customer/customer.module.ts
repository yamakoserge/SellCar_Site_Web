import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { DemoNgZorroAntdModule } from '../../DemoNgZorroAntModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { PostCarComponent } from './components/post-car/post-car.component';
import { MyCarsComponent } from './components/my-cars/my-cars.component';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    PostCarComponent,
    MyCarsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DemoNgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzSpinModule
  ]
})
export class CustomerModule { }
