import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ 
  providedIn: 'root'
})
export class AuthApiService {

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
    return this.http.post<any>('http://localhost:3000/user/login', data);
  }

  apiPOs(){
    return this.http.get('http://localhost:3000/purchase-order/display');
  }
}
