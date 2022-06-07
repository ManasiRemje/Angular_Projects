import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ILogin, ILoginResponse } from './login-data';
import { UserModel } from '../user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { 
    // this.user = this.getUser(this.token);
  }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  get email(){
    return this.loginForm.get('email') as FormControl;
  }

  get password(){
    return this.loginForm.get('password') as FormControl;
  }


  onSubmit() {
    console.log(this.loginForm.value);
    this.loginUser(this.loginForm.value);
    console.log('Called api');
    this.loginForm.reset();
  }

  loginUser(data: ILogin) {
    this.authService.apiLogin(data).subscribe((response: ILoginResponse) => {
      console.log(response);

      const token = response.data.token;
      const role = response.data.Role;
      console.log(role);

      if (token) {
        localStorage.setItem('token', token || '')

        switch (role) {
          case '624e7f775dbb2258ea79b69d': this.authService.getRole('Admin');  
                                           localStorage.setItem('role','Admin');
                                           this.router.navigate(['admin']);               
                                           break;
          case '624e7f985dbb2258ea79b69e':  this.authService.getRole('User'); 
                                            localStorage.setItem('role', 'User');
                                            this.router.navigate(['user']);
                                            break;
        }
      }
    },
      (err) => {
        alert('Invalid details');
      }
    );
  }

  routeForgotPassPage() {
    this.router.navigate(['auth/request']);
  }

  routeSignupPage() {
    this.router.navigate(['auth/register']);
  }

}
