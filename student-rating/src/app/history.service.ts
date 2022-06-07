import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHistory } from './history/history-data';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  url:string = 'https://65cf-103-97-165-115.ngrok.io/';

  constructor(private http: HttpClient) { }

  apiStudentHistory(data:string) {
    return this.http.get<IHistory>(`${this.url}user/getHistory/${data}`);
  }

}
