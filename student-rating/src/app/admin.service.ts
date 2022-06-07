import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITrack, ITrainer } from './admin/admin-data';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  url:string = 'https://65cf-103-97-165-115.ngrok.io/';

  apiAddTrainer(data:ITrainer){
    return this.http.post<any>(`${this.url}user/registerTrainer`, data);
  }

  apiAddTrack(data:ITrack){
    return this.http.post<any>(`${this.url}track/createTrack`, data);
  }

}
