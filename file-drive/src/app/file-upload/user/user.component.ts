import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileService } from '../file.service';
import { IChangeConfigTo, IConfig, IFolder, IGetCofig, IRequest, ISettings, ISettingsConfig, IStatus } from './user-page-data';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isFolderVisible!: boolean;
  isFileVisible!: boolean;
  isSettingsVisible!: boolean;
  isNotification!: boolean;

  clickEventSubscription!: Subscription;

  folders: any = []

  config!: IGetCofig;

  changeConfigTo: IStatus[] = [];

  constructor(private fileService: FileService, private router: Router) {
    this.clickEventSubscription = this.fileService.getClickEvent().subscribe(() => {
      this.closePopup();
    })
  }

  ngOnInit(): void {
    this.getCurrentConfig();
    this.getFolders();
    // this.fileService.sendAddEvent();
  }

  addFolderForm = new FormGroup({
    folderName: new FormControl(''),
  })

  get folderName() {
    return this.addFolderForm.get('folderName') as FormControl;
  }

  addFileForm = new FormGroup({
    folder: new FormControl(''),
    fileName: new FormControl(''),
  })

  get fileName() {
    return this.addFileForm.get('fileName') as FormControl;
  }

  settingsForm = new FormGroup({
    maxFileSize: new FormControl(''),
    maxFileCount: new FormControl(''),
  })

  get maxFileSize() {
    return this.settingsForm.get('maxFileSize') as FormControl;
  }

  get maxFileCount() {
    return this.settingsForm.get('maxFileCount') as FormControl;
  }

  getCurrentConfig() {
    this.fileService.apiGetConfig().subscribe((response: ISettingsConfig) => {
      console.warn(response);
      this.config = response.data[0];
    })
  }

  getFolders() {
    this.fileService.apiGetFolders().subscribe((response: any) => {
      console.warn(response);
      this.folders = response.data;
      console.log(this.folders);
    })
  }

  onFolderSubmit() {
    console.log(this.addFolderForm.value);
    this.addFolder(this.addFolderForm.value);
    this.addFolderForm.reset();
  }

  formDataReceived!: File;
  nameOfFile = '';

  onFileSubmit(event: any) {
    this.addFile();
    this.addFileForm.reset();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.nameOfFile = file.name;
      const formData = new FormData();
      formData.append("actualFile", file);
      this.formDataReceived = file;
    }
  }

  onSettingsSubmit() {
    console.log(this.settingsForm.value);
    this.changeSettings(this.settingsForm.value);
    this.settingsForm.reset();
  }

  addFolder(data: IFolder) {
    this.fileService.apiAddFolder(data).subscribe(response => {
      console.warn(response);
      if (response.data.message) {
        alert(response.data.message);
      }
      this.getFolders();
      this.fileService.sendAddEvent();
    })
    this.isFolderVisible = false;
  }

  addFile() {
    const formData = new FormData();
    formData.append("actualFile", this.formDataReceived);
    formData.append("folderName", this.addFileForm.get('folder')!.value)

    this.fileService.apiAddFile(formData).subscribe(response => {
      console.log(response);
      if (response.data.message) {
        alert(response.data.message);
      }
      else {
        alert('File added');
      }
    })
    this.isFileVisible = false;
  }

  changeSettings(data: ISettings) {
    this.fileService.apiChangeSettings(data).subscribe(response => {
      alert('Your reauest has been forwarded');
      this.isSettingsVisible = false;
    })
  }

  openFolderPopup() {
    this.isFolderVisible = true;
  }

  openFilePopup() {
    this.isFileVisible = true;
  }

  openSettingsPopup() {
    this.isSettingsVisible = true;
    this.getCurrentConfig();
  }

  openNotificationPopup() {
    this.isNotification = true
    this.fileService.apiGetUserRequest().subscribe((response: IRequest) => {
      this.changeConfigTo = response.data;
      console.log(this.changeConfigTo);
    })
  }

  closePopup() {
    this.isFolderVisible = false;
    this.isFileVisible = false;
    this.isSettingsVisible = false;
    this.isNotification = false;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.router.navigate(['auth/login']);
  }
}


