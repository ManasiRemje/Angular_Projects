import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UploadComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ComponentsModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class UserModule { }
