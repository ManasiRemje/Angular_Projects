import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UpdateService } from '../update.service';
import { IUpdate } from './update-data';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from '../history.service';
import { IHistory, IRatings } from '../history/history-data';

@Component({
  selector: 'app-update-rating',
  templateUrl: './update-rating.component.html',
  styleUrls: ['./update-rating.component.scss']
})
export class UpdateRatingComponent implements OnInit {

  constructor(private updateApi: UpdateService, private route:ActivatedRoute, private historyApi: HistoryService) { }

  ratingPossible: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  proactivenessRating = '';
  assignmentRating = '';
  communicationRating = '';
  logicRating = '';
  studentID = '';

  updateRatingForm = new FormGroup({
    logicalRating: new FormControl(''),
    communicationRating: new FormControl(''),
    assignmentRating: new FormControl(''),
    proactivenessRating: new FormControl(''),
  });

  ngOnInit(): void {
    this.studentID = this.route.snapshot.params['id'];
    this.getAllStudents(this.studentID);
  }

  onSubmit() {
    this.updateRating(this.updateRatingForm.value);
  }

  updateRating(data: IUpdate) {
    this.updateApi.apiUpdateRating(data, this.studentID).subscribe(response => {
      console.log(response);
      if (response.data == 'you cannot update ratings more than once in a week') {
        alert(response.data);
      }
      this.updateRatingForm.reset();
    })
  }

  name: string = '';
  age !: number;
  email:string = '';
  history: IRatings[] = [];

  getAllStudents(data: string) {
    this.historyApi.apiStudentHistory(data).subscribe((response: IHistory) => {
      this.history = response.data.ratingHistory;
      this.name = response.data.name;
      this.age = response.data.age;
      this.email = response.data.email;
    })
  }
}
