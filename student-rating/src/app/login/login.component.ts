import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { ILogin, IData, ISendData } from './login-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService:LoginService) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit() {
    console.warn(this.loginForm.value);
    this.loginUser(this.loginForm.value);
  }

  loginUser(data: ISendData) {
    this.loginService.apiLogin(data).subscribe((response: ILogin) => {
      const token = response.data.token;
      const role = response.data.Role;
    
      if (token) {
        localStorage.setItem('token', token || '')
        switch (role) {
          case '6242e15e0f1436094ed5ee1f': this.router.navigate(['admin']);
                        break;
          case '6242e16d0f1436094ed5ee21': this.router.navigate(['trainer']);
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
