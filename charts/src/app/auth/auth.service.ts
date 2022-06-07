import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin, ILoginResponse } from './login/login-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  url: string = 'https://5b2e-1-22-124-182.ngrok.io/';
  
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

  apiLogin(data:ILogin){
    console.log(data);
    return this.http.post<any>(`${this.url}user/signup`, data);
  }


}
