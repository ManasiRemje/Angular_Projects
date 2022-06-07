import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { AdminComponent } from './admin.component';
import { RequestsComponent } from './requests/requests.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, RoleGuard],
    data: { role:'Admin' },
    children: [
      { path: '', component: UserListComponent },
      { path: 'requests', component: RequestsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
