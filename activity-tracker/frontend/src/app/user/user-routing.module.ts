import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
  { path: 'user', canActivate: [AuthGuard, RoleGuard],
    data: { role:'User' },
    children: [
          { path: '', component: DashboardComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
