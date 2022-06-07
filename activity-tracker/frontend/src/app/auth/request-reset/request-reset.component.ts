import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    email: new FormControl('', [Validators.required, Validators.email]),
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
      alert('A link to reset your password has been sent the specified mail ID');
      this.router.navigate(['auth']);
    },
    (err) => {
      console.log(err);
      
      alert(err.error.error.message);
    })
  }

}
