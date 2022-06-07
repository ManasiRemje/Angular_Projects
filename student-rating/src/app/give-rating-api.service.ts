import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITracks } from './give-rating/rating-data';

@Injectable({
  providedIn: 'root'
})
export class GiveRatingApiService {

  constructor(private http: HttpClient) { }

  url:string = 'https://65cf-103-97-165-115.ngrok.io/';

  apiTracks() {
    return this.http.get<ITracks>(`${this.url}track/getAllTracks`);
  }

  apiSubmitRating(data:any){
    return this.http.post<any>(`${this.url}user/registerStudent`, data);
  }

}
