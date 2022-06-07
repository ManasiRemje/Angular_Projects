import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  // const urlMain = ''
  getToken(){
    return localStorage.getItem('token');
  }

  // Add Employee
  addPersonal(data: any) {
    return this.http.post<any>('http://localhost:3000/user/register', data);
  }

  apiRoles(){
    return this.http.get('http://localhost:3000/role/display');
  }

  apiFurnaces() {
    return this.http.get('http://localhost:3000/furnace/display');
  }

  createFurnace(data: any) {
    return this.http.post<any>('http://localhost:3000/furnace/create', data);
  }

  createStorage(data: any) {
    return this.http.post<any>('http://localhost:3000/storage/create', data);
  }

  addProduct(data: any) {
    return this.http.post<any>('http://localhost:3000/product/create', data);
  }

  addCustomer(data: any) {
    return this.http.post<any>('http://localhost:3000/user/register-customer', data);
  }

}
