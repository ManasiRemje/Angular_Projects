import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule} from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { AddAssetsComponent } from './add-assets/add-assets.component';
import { RoutingComponents } from './app-routing.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CreatePOComponent } from './create-po/create-po.component';
import { SalespersonComponent } from './salesperson/salesperson.component';
import { StorageComponent } from './storage/storage.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { DriverComponent } from './driver/driver.component';
import { ShowPoComponent } from './show-po/show-po.component';
import { ShowProductsComponent } from './show-products/show-products.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TokenInterceptorService } from './token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AddRolesComponent,
    AddAssetsComponent,
    RoutingComponents,
    AddCustomerComponent,
    CreatePOComponent,
    SalespersonComponent,
    StorageComponent,
    ManufacturerComponent,
    DriverComponent,
    ShowPoComponent,
    ShowProductsComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
