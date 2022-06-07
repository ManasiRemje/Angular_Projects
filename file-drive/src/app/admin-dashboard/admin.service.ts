import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { IConfig, IUser } from './user-list/user-data';
import { IRequest, IApprove } from './requests/request-data';
import { IPopup, IUser } from './user-list/user-data';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  url:string = 'https://340d-2409-4042-4d8e-6ac0-8058-3dbd-ac6d-255d.ngrok.io/';

  apiGetUsers(){
    return this.http.get<IUser>(`${this.url}user/getAllUsers/1/5`);
  }

  apiShowUser(id:string){
    return this.http.get<IPopup>(`${this.url}user/getUserConfig/${id}`);
  }

  apiGetRequests(){
    return this.http.get<IRequest>(`${this.url}user/getAllRequest/All/1/5`);
  }

  apiFilter(data:string){
    return this.http.get<IRequest>(`${this.url}user/getAllRequest/${data}/1/1`);
  }

  apiPaginator(pageSize:number, pageNumber:number){
    console.log(pageSize + 'here' + pageNumber);
    return this.http.get<IUser>(`${this.url}user/getAllUsers/${pageNumber}/${pageSize}`);
  }

  apiPaginatorRequests(pageSize:number, pageNumber:number){
    console.log(pageSize + 'here' + pageNumber);
    return this.http.get<IRequest>(`${this.url}user/getAllRequest/All/${pageNumber}/${pageSize}`);
  }

  apiApproveUser(data:IApprove){
    return this.http.post(`${this.url}user/requestStatus`, data);
  }
}
