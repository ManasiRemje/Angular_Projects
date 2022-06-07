import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', component: LoginComponent },
      { path: 'request', component: RequestResetComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'reset-password/:token', component: ResetPasswordComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
