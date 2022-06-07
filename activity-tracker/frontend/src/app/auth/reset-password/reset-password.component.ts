import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IReset, IResetResponse } from './reset-data';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  userID = '';
  resetButtonName = 'Reset';

  ngOnInit(): void {
    this.userID = this.route.snapshot.params['token'];
    console.log(this.userID);
  }

  resetForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  get newPassword() {
    return this.resetForm.get('newPassword') as FormControl;
  }

  get confirmPassword() {
    return this.resetForm.get('confirmPassword') as FormControl;
  }

  onSubmit() {
    const newPass = this.resetForm.get('newPassword')?.value;
    const confirmPass = this.resetForm.get('confirmPassword')?.value;
    if (newPass == confirmPass) {
      const data = { resetToken: this.userID, password: newPass, confirmPassword: confirmPass };
      console.log(data);
      this.resetPassword(data);
      this.resetForm.reset();
    }
    else {
      alert('The passwords do not match');
    }
  }

  resetPassword(data: IReset) {
    this.authService.apiResetPassword(data).subscribe((response: IResetResponse) => {
      console.warn(response);
      alert(response.data.message);
      this.router.navigate(['auth']);
    },
      (err) => {
        console.log(err);

        alert('The reset link has expired !');
      })
  }

}
