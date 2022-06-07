import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { RequestsComponent } from './requests/requests.component';
import { ComponentsModule } from '../components/components.module';
import { AdminComponent } from './admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserListComponent,
    AdminComponent,
    RequestsComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    ComponentsModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminDashboardModule { }
