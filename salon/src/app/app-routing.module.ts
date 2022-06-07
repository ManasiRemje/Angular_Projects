import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AvgrateComponent } from './avgrate/avgrate.component';


export const RoutingComponents = [
  LoginComponent,
  FeedbackComponent,
  AvgrateComponent
]

const routes: Routes = [
  // { path:'', component:LoginComponent },
  { path:'login', component:LoginComponent },
  { path:'feedback', component:FeedbackComponent },
  { path:'averageRating', component:AvgrateComponent },
  // { path: '/', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
