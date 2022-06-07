import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsComponent } from './inputs/inputs.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayBoxComponent } from './display-box/display-box.component';

@NgModule({
  declarations: [
    InputsComponent,
    ButtonComponent,
    DisplayBoxComponent
  ],

  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule
  ],

  exports: [
    InputsComponent,
    ButtonComponent,
    DisplayBoxComponent
  ],
})
export class ComponentsModule { }
