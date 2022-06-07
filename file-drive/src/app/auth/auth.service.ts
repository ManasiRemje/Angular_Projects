import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin, ILoginResponse } from './login/login-data';
import { IRegister } from './register/register-data';
import { IResetRequest } from './request-reset/reset-request-data';
import { IReset } from './reset-password/reset-data';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  url: string = 'https://340d-2409-4042-4d8e-6ac0-8058-3dbd-ac6d-255d.ngrok.io/';
  user!: UserModel;

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

  private getUser(token:string|null): UserModel{
    return JSON.parse(atob(token!.split('.')[1])) as UserModel;
  }

  apiResetPassword(data:IReset){
    return this.http.post<any>(`${this.url}user/resetPassword`, data);
  }

  apiSendEmail(data:IResetRequest){
    return this.http.post<any>(`${this.url}user/forgetPassword`, data);
  }

  apiLogin(data:ILogin){
    return this.http.post<any>(`${this.url}user/login`, data);
  }

  apiRegister(data:IRegister){
    return this.http.post<any>(`${this.url}user/register`, data);
  }


}
