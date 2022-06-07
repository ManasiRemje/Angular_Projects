import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { RequestResetComponent } from './auth/request-reset/request-reset.component';
import { UserComponent } from './file-upload/user/user.component';
import { UserListComponent } from './admin-dashboard/user-list/user-list.component';
import { RequestsComponent } from './admin-dashboard/requests/requests.component';
import { AdminComponent } from './admin-dashboard/admin.component';

export const RoutingComponents = [
  RequestResetComponent,
  LoginComponent,
  RegisterComponent,
  AuthComponent,
  UserComponent,
  RegisterComponent,
  ResetPasswordComponent,
  UserListComponent,
  RequestsComponent,
  AdminComponent
]

const routes: Routes = [
  { path: '/', redirectTo: 'auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
