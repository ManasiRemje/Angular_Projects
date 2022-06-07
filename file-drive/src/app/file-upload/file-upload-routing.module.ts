import { NgModule } from '@angular/core';
import { FilesComponent } from './files/files.component';
import { FoldersComponent } from './folders/folders.component';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

const routes: Routes = [
  { path: 'user', component: UserComponent, canActivate: [AuthGuard, RoleGuard],
    data: { role:'User' },
    children: [
          { path: '', component: FoldersComponent },
          { path: 'folder', component: FoldersComponent },
          { path: 'settings', component: SettingsComponent },
    ]
  },
  { path: 'files/:name', component: FilesComponent, canActivate: [AuthGuard, RoleGuard], data: { role:'User' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileUploadRoutingModule { }
