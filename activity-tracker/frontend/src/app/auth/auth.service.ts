import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin, ILoginResponse } from './login/login-data';
import { IRegister, IRegisterResponse } from './register/register-data';
import { IRequestResponse, IResetRequest } from './request-reset/reset-request-data';
import { IResetResponse } from './reset-password/reset-data';
import { IReset } from './reset-password/reset-data';

@Injectable({ 
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000/user/';

  getToken(){
    return localStorage.getItem('token');
  }

  checkToken(): boolean{
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  role:string = '';

  getRole(data:string){
    this.role = data;
    localStorage.setItem
    console.log(this.role);
  }

  apiResetPassword(data:IReset){
    return this.http.post<IResetResponse>(`${this.url}new-password`, data);
  }

  apiSendEmail(data:IResetRequest){
    return this.http.post<IRequestResponse>(`${this.url}reset-password`, data);
  }

  apiLogin(data:ILogin){
    return this.http.post<ILoginResponse>(`${this.url}login`, data);
  }

  apiRegister(data:IRegister){
    return this.http.post<IRegisterResponse>(`${this.url}register`, data);
  }


}
