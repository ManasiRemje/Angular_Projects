import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IYear } from './year-chart/year-data';
import * as io from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';
import { IDaily } from './days-chart/days-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly socketUrl:string = "http://localhost:9000";

  constructor(private http: HttpClient) {
   }

  url: string = 'https://5b2e-1-22-124-182.ngrok.io/';

  apiGetYearChart(){
    return this.http.get<IYear>(`${this.url}sales/display`);
  }

  apiGetDailyChart(){
    return this.http.get<IDaily>(`${this.url}dailySales/report`);
  }
}
