import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { DaysChartComponent } from './days-chart/days-chart.component';
import { YearChartComponent } from './year-chart/year-chart.component';

const routes: Routes = [
  { path: 'user', canActivate: [AuthGuard, RoleGuard],
  data: { role:'User' },
  children: [
        { path: '', component: YearChartComponent},
        { path: 'days', component: DaysChartComponent }
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
