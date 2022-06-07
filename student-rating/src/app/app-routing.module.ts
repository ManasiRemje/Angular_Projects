import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';
import { GiveRatingComponent } from './give-rating/give-rating.component';
import { UpdateRatingComponent } from './update-rating/update-rating.component';
import { AdminComponent } from './admin/admin.component';
import { FilterComponent } from './filter/filter.component';
import { TrainerComponent } from './trainer/trainer.component';
import { AuthGuard } from './auth.guard'; 

export const RoutingComponents = [
  LoginComponent,
  HistoryComponent,
  GiveRatingComponent,
  UpdateRatingComponent,
  AdminComponent,
  FilterComponent,
  TrainerComponent
]

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'trainer', component: TrainerComponent,canActivate: [AuthGuard],
    children: [
      { path: 'history/:id', component: HistoryComponent },   
      { path: 'rating', component: GiveRatingComponent },
      { path: 'update/:id', component: UpdateRatingComponent },
      { path: 'filter', component: FilterComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
