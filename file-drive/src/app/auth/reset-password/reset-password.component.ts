import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IReset } from './reset-data';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router, private route: ActivatedRoute) { }

  studentID = '';
  resetButtonName = 'Reset';

  ngOnInit(): void {
    this.studentID = this.route.snapshot.params['id'];
    console.log(this.studentID);
  }

  resetForm = new FormGroup({
    newPassword: new FormControl(''),
    confirmPassword: new FormControl('')
  })

  get newPassword(){
    return this.resetForm.get('newPassword') as FormControl;
  }

  get confirmPassword(){
    return this.resetForm.get('confirmPassword') as FormControl;
  }

  onSubmit(){
    const newPass = this.resetForm.get('newPassword')?.value;
    const confirmPass = this.resetForm.get('confirmPassword')?.value;
    if(newPass == confirmPass){
      const data = {_id: this.studentID, newPassword:newPass, confirmPassword: confirmPass};
      console.log(data);
      this.resetPassword(data);
      this.resetForm.reset();
    }
    else{
      alert('The passwords do not match');
    }
  }

  resetPassword(data: IReset){
    this.authService.apiResetPassword(data).subscribe(response => {
      console.warn(response);
      alert('Your password has been reset');
      this.router.navigate(['auth/login']);
    })
  }

}
