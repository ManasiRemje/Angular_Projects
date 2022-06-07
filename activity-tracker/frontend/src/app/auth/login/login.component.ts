import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ILogin, ILoginResponse } from './login-data';


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
    email: new FormControl('', [Validators.required, Validators.email]),
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
    this.loginForm.reset();
  }

  loginUser(data: ILogin) {
    this.authService.apiLogin(data).subscribe((response: ILoginResponse) => {
      console.log(response);

      const token = response.data.token;
      const role = response.data.role;
      console.log(role);

      if (token) {
        localStorage.setItem('token', token || '')

        switch (role) {
          case '625f9580809d29a91e94d649': localStorage.setItem('role','Admin');
                                           this.router.navigate(['admin']);               
                                           break;
          case '625f9580809d29a91e94d64a': localStorage.setItem('role', 'User');
                                           this.router.navigate(['user']);
                                           break;
        }
      }
    },
      (err) => {
        alert('Invalid details');
        // alert(err.error.error.message);
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
