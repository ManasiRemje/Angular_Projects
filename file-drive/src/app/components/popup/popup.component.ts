import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FileService } from 'src/app/file-upload/file.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
  }

  closePopup() {
    this.fileService.sendClickEvent();
  }

}
