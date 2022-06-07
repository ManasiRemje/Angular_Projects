import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputsComponent,
      multi: true
    }
  ]
})
export class InputsComponent implements OnInit, ControlValueAccessor {

  @Input() id: string = '';
  @Input() type: string = '';
  @Input() formControl!: FormControl;
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() value!: any;

  onChange = (val: any) => { }
  onTouched = () => { }

  constructor() { }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
  }
}
