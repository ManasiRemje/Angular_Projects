import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ILoginResponse } from './login-data';
import { SocialAuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private socialAuthService: SocialAuthService) {}

  socialUser!: SocialUser;

  ngOnInit(): void {
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log(this.socialUser);
      this.loginUser(this.socialUser.id, this.socialUser.email, this.socialUser.name);
    });
  }

  loginUser(id:string, email:string, name:string) {
    const data = {id:id, email:email, name:name};
    this.authService.apiLogin(data).subscribe((response: ILoginResponse) => {
      console.log(response);

      const token = response.data;
      
      if (token) {
        localStorage.setItem('token', token || '')
        this.authService.getRole('User');  
        localStorage.setItem('role','User');
        this.router.navigate(['user']);               
      }
    },
      (err) => {
        // console.log(err);
        alert('Invalid details');
      }
    );
  }

}
