import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private router: ActivatedRoute, private userService: UserService, private route:Router) { }

  formDataReceived!: File;
  nameOfFile = '';
  cycleId: string = '';
  subCycleId: string = '';
  taskId: string = '';

  ngOnInit(): void {
    this.cycleId = this.router.snapshot.params['cycleId'];
    this.subCycleId = this.router.snapshot.params['subCycleId'];
    this.taskId = this.router.snapshot.params['taskId'];
  }

  certificateForm = new FormGroup({
    file: new FormControl(''),
    date: new FormControl(''),
  })

  get file(){
      return this.certificateForm.get('file') as FormControl;
  }

  get date(){
    return this.certificateForm.get('date') as FormControl;
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

  routeToDashboard(){
    this.route.navigate(['user']);
  }

  onSubmit(){
    const formData = new FormData();
    formData.append("certificate", this.formDataReceived);
    formData.append("certificationDate", this.certificateForm.get('date')!.value);
    formData.append("cycle", this.cycleId);
    formData.append("subCycle", this.subCycleId);
    formData.append("task", this.taskId);

    console.log(this.formDataReceived);
    console.log(this.certificateForm.get('date')!.value + ' '+ this.cycleId + ' ' + this.subCycleId + ' ' + this.taskId);
    
    this.userService.apiAddFile(formData).subscribe(response => {
      console.log(response);
        alert('Activity completed');
        this.certificateForm.reset();
        this.routeToDashboard();
    },
    (err) => {
      console.log(err);
      alert('Invalid upload');
    }
    )
  }

}
