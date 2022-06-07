import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsComponent } from './inputs/inputs.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    InputsComponent,
    ButtonComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InputsComponent,
    ButtonComponent,
    PopupComponent
  ],
})
export class ComponentsModule { }
