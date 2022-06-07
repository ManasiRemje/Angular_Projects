import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AdminModule { }
