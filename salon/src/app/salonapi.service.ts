import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SalonapiService {
  constructor(private http: HttpClient, private router: Router) {}

  apiEmployees() {
    return this.http.get('http://localhost:4000/user');
  }

  apiServices() {
    return this.http.get('http://localhost:4000/user');
  }

  sendFeedback(data:any){
    return this.http.post<any>('http://localhost:4000/user', data);
  }

  apiFilter(data:any){
    console.log(data.serviceBy);

    let params1 = new HttpParams().set('fromDate', data.fromDate);
    let params2 = new HttpParams().set('toDate', data.toDate );
    let params3 = new HttpParams().set('servicedBy', data.serviceBy );
    let params4 = new HttpParams().set('overallAverage', data.overallAverage );

    return this.http.post<any>('http://localhost:4000/user', {params: params1, params2, params3, params4});
  }

  apiRegister(data:any){
    return this.http.post<any>('http://localhost:4000/user', data);
  }

  apiLogin(data:any){
    return this.http.post<any>('http://localhost:4000/user', data);
  }

}
