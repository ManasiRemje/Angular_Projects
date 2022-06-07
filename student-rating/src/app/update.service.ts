import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUpdate } from './update-rating/update-data';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http: HttpClient) { }

  url:string = 'https://65cf-103-97-165-115.ngrok.io/';

  apiUpdateRating(data: IUpdate, id: string){
    return this.http.put<any>(`${this.url}user/updateRatings/${id}`, data);
  }

}
