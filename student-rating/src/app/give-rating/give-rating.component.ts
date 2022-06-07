import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITracks, IData, IGivenRating } from './rating-data';
import { GiveRatingApiService } from '../give-rating-api.service';

@Component({
  selector: 'app-give-rating',
  templateUrl: './give-rating.component.html',
  styleUrls: ['./give-rating.component.scss']
})
export class GiveRatingComponent implements OnInit {

  ngOnInit(): void {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhc3NpZ25lZFRyYWNrIjpbXSwicmF0aW5ncyI6W10sInVwZGF0aW9uRGF0YSI6W10sIl9pZCI6IjYyNDJlNTEwOGViMDMyMTlkNWIxMjI4NCIsIm5hbWUiOiJzcmlzaHRpIiwiZW1haWwiOiJzcmlzaHRpQGdtYWlsLmNvbSIsImFnZSI6NCwicm9sZSI6WyI2MjQyZTE1ZTBmMTQzNjA5NGVkNWVlMWYiXSwicGFzc3dvcmQiOiJhYmNkIiwiY3JlYXRlZEF0IjoiMjAyMi0wMy0yOVQxMDo1MzowNC43NDFaIiwidXBkYXRlZEF0IjoiMjAyMi0wMy0yOVQxMDo1MzowNC43NDFaIiwiX192IjowLCJpYXQiOjE2NDg5OTU2ODl9.0_JAK4Ok5qx1ZOSpsmLuVRGcMLotX5WZZ6NX_RtQJfQ');
    this.getTracks();
  }

  selectedTrack = '';
  tracksReceived: IData[] = [];

  ratingPossible: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  ratingForm = new FormGroup({
    name: new FormControl('', Validators.pattern('[a-zA-Z ]*')),
    age: new FormControl(''),
    email: new FormControl('', Validators.email),
    logicalRating: new FormControl(''),
    communicationRating: new FormControl(''),
    assignmentRating: new FormControl(''),
    proactivenessRating: new FormControl(''),
    assignedTrack: new FormControl(''),
  });

  get name() {
    return this.ratingForm.get('name');
  }
  
  constructor(private apiService: GiveRatingApiService) {
    // const hint = name.errors;
  }

  submitRating(data: IGivenRating) {
    this.apiService.apiSubmitRating(data).subscribe(response => {
      console.warn(response);
    })
  }

  getTracks() {
    this.apiService.apiTracks().subscribe((response: ITracks) => {
      console.warn(response.data);
      this.tracksReceived = response.data;
    })
  }

  onSubmit() {
    console.warn(this.ratingForm.value);
    this.submitRating(this.ratingForm.value);
    this.ratingForm.reset();
    alert('Rating was added');
  }

}
