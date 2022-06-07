import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    FileUploadModule,
    ComponentsModule,
    CommonModule,
    AdminDashboardModule
  ],

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
