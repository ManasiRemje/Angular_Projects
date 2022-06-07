import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string = 'https://65cf-103-97-165-115.ngrok.io/';

  constructor(private http: HttpClient) { }

  getToken(){
    return localStorage.getItem('token');
  }

  checkToken(): boolean{
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  apiLogin(data:any){
    return this.http.post<any>(`${this.url}user/login`, data);
  }

}
