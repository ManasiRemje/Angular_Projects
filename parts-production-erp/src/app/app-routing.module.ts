import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { AddAssetsComponent } from './add-assets/add-assets.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CreatePOComponent } from './create-po/create-po.component';
import { DriverComponent } from './driver/driver.component';
import { StorageComponent } from './storage/storage.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { ShowProductsComponent } from './show-products/show-products.component';
import { ShowPoComponent } from './show-po/show-po.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AuthGuardGuard } from './auth-guard.guard';

export const RoutingComponents = [
  AddRolesComponent,
  AddAssetsComponent,
  AddCustomerComponent,
  CreatePOComponent,
  DriverComponent,
  StorageComponent,
  ManufacturerComponent,
  ShowProductsComponent,
  ShowPoComponent,
  LoginComponent,
  AdminComponent,
  AccountsComponent
]

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'driver', component: DriverComponent, canActivate: [AuthGuardGuard] },
  { path: 'storage', component: StorageComponent, canActivate: [AuthGuardGuard] },
  { path: 'manufacturer', component: ManufacturerComponent, canActivate: [AuthGuardGuard] },
  { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuardGuard] },
  { path: 'createPO', component: CreatePOComponent, canActivate: [AuthGuardGuard] },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardGuard],
    children: [
      { path: 'roles', component: AddRolesComponent },
      { path: 'assets', component: AddAssetsComponent },
      { path: 'customer', component: AddCustomerComponent },
      { path: 'products', component: ShowProductsComponent },
      { path: 'POs', component: ShowPoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
