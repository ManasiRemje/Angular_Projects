import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITasks, IUserResponse } from './dashboard/dash-data';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private subject = new Subject<ITasks[]>();

  constructor(private http: HttpClient) { }
 
  url: string = 'http://localhost:3000/user';

  tasks!:ITasks[];
  cycleId:string = '';
  subCycleId:string = '';
  subCycleNo:number = 0;

  getTasks(): Observable<ITasks[]> {
    return this.subject.asObservable();
  }

  sendTasks(data:ITasks[]){
    this.subject.next(data);
  }

  getIds(cycleId:string, subCycleId:string, subCycleNo:number){
    this.cycleId = cycleId;
    this.subCycleId = subCycleId;
    this.subCycleNo = subCycleNo;
  }

  apiAddFile(data: FormData) {
    return this.http.post<any>(`${this.url}/activity`, data);
  }

  apiGetUserData(){
    return this.http.get<IUserResponse>(`${this.url}`);
  }

  apiNextCycle() {
    return this.http.post<any>(`${this.url}/cycle`, undefined);
  }
}
