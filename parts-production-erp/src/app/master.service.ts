import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  apiProducts() {
    return this.http.get('http://localhost:3000/product/display');
  }

  apiCustomers() {
    return this.http.get('http://localhost:3000/user/get-customers');
  }


}
