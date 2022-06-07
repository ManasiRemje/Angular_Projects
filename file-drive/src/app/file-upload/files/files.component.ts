import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../file.service';
import { IData, IFiles } from './files-data';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private fileService: FileService, private router:Router) {  this.clickEventSubscription = this.fileService.getClickEvent().subscribe(() => {
    this.closePopup();
  })
 }

  folder: string = '';

  files!:IData[];

  ngOnInit(): void {
    this.folder = this.route.snapshot.params['name'];
    this.getAllFiles(this.folder);
  }

  isFileVisible!: boolean;
  clickEventSubscription!: Subscription;

  addFileForm = new FormGroup({
    fileName: new FormControl(''),
  })

  get fileName() {
    return this.addFileForm.get('fileName') as FormControl;
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
      console.log(file);
      this.formDataReceived = file;
    }
  }

  openFilePopup() {
    this.isFileVisible = true;
  }

  addFile() {
    const formData = new FormData();
    formData.append("actualFile", this.formDataReceived);
    formData.append("folderName", this.folder)
    console.log(this.folder);
    
    this.fileService.apiAddFile(formData).subscribe(response => {
      console.log(response);
      if(response.data.message){
        alert(response.data.message);
      }
      this.getAllFiles(this.folder);
    })
    this.isFileVisible = false; 
  }

  getAllFiles(data: string) {
    this.fileService.apiGetFiles(data).subscribe((response: IFiles) => {
      
      if(response.data.message === 'Empty folder'){
        alert(response.data.message);
      }
      else{
        this.files = response.data;
      }
    })
  }

  downloadFile(fileName:string){
    this.fileService.apiDownloadFile(this.folder, fileName).subscribe(response => {
      saveAs(response, fileName);
    })
  }

  deleteFile(fileName:string){
    if (confirm(`Are you sure you want to delete the file ${fileName} ?`) == true) {
      const ObjectToSend = {
        "folderName": this.folder,
        "fileName": fileName
      }
      
      this.fileService.apiDeleteFile(ObjectToSend).subscribe((response:any) => {
        alert('File Deleted');
        this.getAllFiles(this.folder);
      })
    }
  }

  routeToFolders(){
    this.router.navigate(['user/folder']);
  }

  closePopup() {
    this.isFileVisible = false;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.router.navigate(['auth/login']);
  }
}
