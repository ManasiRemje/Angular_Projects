import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IData } from './list-users/list-data';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:3000/user/';

  apiGetUsers(pageNumber:number, pageSize:number, year:number){
    return this.http.get<IData>(`${this.url}all-users?page=${pageNumber}&itemsPerPage=${pageSize}&year=${year}`);
  }

  apiBlockUser(id:string){
    return this.http.post<any>(`${this.url}block/${id}`, undefined);
  }

  apiUnblockUser(id:string){
    return this.http.post<any>(`${this.url}unblock/${id}`, undefined);
  }
}
