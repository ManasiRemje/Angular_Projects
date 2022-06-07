import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthApiService } from '../auth-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthApiService, private router: Router) { }

  loginForm = new FormGroup({
    userID: new FormControl(''),
    password: new FormControl('')
  });


  onSubmit() {
    console.warn(this.loginForm.value);
    this.loginUser(this.loginForm.value);
  }

  loginUser(data: any) {
    this.authService.apiLogin(data).subscribe((response: any) => {
      console.log(response);
      const token = response.data?.token;
      const role = response.data?.role;
    
      if (token) {
        localStorage.setItem('token', token || '')
        switch (role) {
          case '62442a219025e1deab324055': this.router.navigate(['admin']);
                        break;
          case '62442d96f192c3c376008691': this.router.navigate(['createPO']);
                              break;
          case '62442d86f192c3c37600868d': this.router.navigate(['storage']);
                              break;
          case '62442d6cf192c3c37600868b': this.router.navigate(['accounts']);
                            break;
          case '62442d60f192c3c376008689': this.router.navigate(['manufacturer']);
                                break;
          case '62442d8af192c3c37600868f': this.router.navigate(['driver']);
                          break;
        }
      }
    },
      (err) => {
        alert('Invalid details');
      }
    );
  }
}
