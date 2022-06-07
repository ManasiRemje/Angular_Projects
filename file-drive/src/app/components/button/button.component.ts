import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() buttonName: string = '';
  @Input() type: string = '';
  @Input() path: string = '';
  @Output() onClicked: EventEmitter<any> = new EventEmitter();


  onClick(event: any) {
    this.onClicked.emit(event)
  }

}
