import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ITasks } from '../dashboard/dash-data';
import { UserService } from '../user.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  dataEventSubscription!: Subscription;

  @Input() category: string = '';

  tasks!: ITasks[];

  constructor(private userService: UserService, private route: Router) {
    this.userService.getTasks().subscribe((response: ITasks[]) => {
      this.tasks = response;
    })
  }

  ngOnInit(): void {
  }

  routeToActivity(taskId:string, permit:boolean){
    if(permit === true){
      alert('You cannot resubmit the same activity');
    }
    else{
      const cycleId = this.userService.cycleId;
      const subCycleId = this.userService.subCycleId; 
      this.route.navigate([`user/upload/${cycleId}/${subCycleId}/${taskId}`]);
    }
  }

  getSubCycle(){
    return this.userService.subCycleNo;
  }

}
