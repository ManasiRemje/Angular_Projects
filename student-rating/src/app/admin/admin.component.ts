import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
import { ITrack, ITrainer, IData, ITracks } from './admin-data';
import { GiveRatingApiService } from '../give-rating-api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private apiAdmin: AdminService, private apiRating: GiveRatingApiService) { }

  ngOnInit(): void {
    this.getTracks();
  }

  selectedTrack = '';
  tracksReceived: IData[] = [];

  addTrainerForm = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(''),
    email: new FormControl(''),
    password:  new FormControl(''),
    assignedTrack: new FormControl(''),
  });

  addTrackForm= new FormGroup({
    track: new FormControl(''),
  });

  onSubmitAddTrainer(){
    console.log(this.addTrainerForm.value);
    this.addTrainer(this.addTrainerForm.value);
  }

  onSubmitAddTrack(){
    console.log(this.addTrackForm.value);
    this.addTrack(this.addTrackForm.value)
  }

  addTrainer(data:ITrainer){
    this.apiAdmin.apiAddTrainer(data).subscribe(response => {
      console.warn(response);
    })
  }

  addTrack(data:ITrack){
    this.apiAdmin.apiAddTrack(data).subscribe(response => {
      console.warn(response);
    })
  }

  getTracks() {
    this.apiRating.apiTracks().subscribe((response: ITracks) => {
      console.warn(response.data);
      this.tracksReceived = response.data;
    })
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['login']);
  }

}
