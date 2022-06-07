import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadRoutingModule } from './file-upload-routing.module';
import { FoldersComponent } from './folders/folders.component';
import { FilesComponent } from './files/files.component';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FoldersComponent,
    FilesComponent,
    SettingsComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    FileUploadRoutingModule,
    RouterModule,
    ComponentsModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class FileUploadModule { }
