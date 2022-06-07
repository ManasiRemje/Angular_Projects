import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: 'admin', canActivate: [AuthGuard, RoleGuard],
    data: { role:'Admin' },
    children: [
          { path: '', component: ListUsersComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
