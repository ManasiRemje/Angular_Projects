import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHistoryData, IHistory, IAssignedTracks, IRatings } from './history-data';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private historyApi: HistoryService) { }
  studentID: string = '';
  name: string = '';
  age !: number;
  email:string = '';


  displayedColumns: string[] = ['Weeks', 'Logical', 'Communication', 'Assignment', 'Proactiveness'];
  history: IRatings[] = [];

  ngOnInit(): void {
    this.studentID = this.route.snapshot.params['id'];
    this.getAllStudents(this.studentID);
  }

  getAllStudents(data: string) {
    this.historyApi.apiStudentHistory(data).subscribe((response: IHistory) => {
      this.history = response.data.ratingHistory;
      this.name = response.data.name;
      this.age = response.data.age;
      this.email = response.data.email;
    })
  }

}
