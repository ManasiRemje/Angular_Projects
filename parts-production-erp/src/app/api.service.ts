import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // salesperson
  createPO(data: any) {
    return this.http.post<any>('http://localhost:3000/purchase-order/create', data);
  }

  // Manufacturer
  apiSendManufactured(data: any) {
    return this.http.put<any>('http://localhost:3000/purchase-order/manufacturer', data);
  }

  apiPending() {
    return this.http.get<any>('http://localhost:3000/purchase-order/display/62452c9c128eb4e5df840966');
  }

  // Driver
  apiStoredPOs() {
    return this.http.get<any>('http://localhost:3000/purchase-order/display/62452d5a22167930cb614c1e');
  }

  apiSendDelivered(data: any) {
    return this.http.put<any>('http://localhost:3000/purchase-order/driver', data);
  }

  // Storer
  apiManufacturedPOs() {
    return this.http.get<any>('http://localhost:3000/purchase-order/display/62452d4d22167930cb614c1c');
  }

  apiMakeStored(data: any) {
    return this.http.put<any>('http://localhost:3000/purchase-order/store-person', data);
  }

  apiRacks() {
    return this.http.get('http://localhost:3000/storage/display');
  }

  // Accounts
  apiConfirmPayment(data: any) {
    return this.http.put<any>('http://localhost:3000/purchase-order/accountant', data);
  }
}
