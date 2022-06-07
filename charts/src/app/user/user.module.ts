import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { YearChartComponent } from './year-chart/year-chart.component';
import { DaysChartComponent } from './days-chart/days-chart.component';


@NgModule({
  declarations: [
    YearChartComponent,
    DaysChartComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
