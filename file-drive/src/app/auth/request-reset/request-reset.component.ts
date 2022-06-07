import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IResetRequest } from './reset-request-data';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  requestResetButtonName = 'Request Reset';

  requestResetForm = new FormGroup({
    email: new FormControl(''),
  })

  get email(){
    return this.requestResetForm.get('email') as FormControl;
  }

  onSubmit(){
    console.log(this.requestResetForm.value);
    this.requestReset(this.requestResetForm.value);
    this.requestResetForm.reset();
  }

  requestReset(data: IResetRequest){
    this.authService.apiSendEmail(data).subscribe(response => {
      console.warn(response);
      this.router.navigate(['auth/login']);
    })
  }

}
