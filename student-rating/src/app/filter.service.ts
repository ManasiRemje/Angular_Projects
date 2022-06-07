import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStudents } from './filter/all-students';
import { ITracks } from './filter/all-students';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) { }

  url:string = 'https://65cf-103-97-165-115.ngrok.io/';

  apiAllStudents() {
    return this.http.get<IStudents>(`${this.url}user/getAllStudents`);
  }

  apiTracks() {
    return this.http.get<ITracks>(`${this.url}track/getAllTracks`);
  }

  apiApplyFilter(data:any){
    let query = '';
    Object.keys(data).forEach((key: string) => {
      if (data[key]) {
        query += `${data[key]}/`;
      }
    })
    console.log(query);
    return this.http.get<IStudents>(`${this.url}user/filter/${query}`);
  }

}
