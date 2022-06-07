import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsComponent } from './inputs/inputs.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InputsComponent,
    ButtonComponent
  ],

  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule
  ],

  exports: [
    InputsComponent,
    ButtonComponent,
  ],
})
export class ComponentsModule { }
