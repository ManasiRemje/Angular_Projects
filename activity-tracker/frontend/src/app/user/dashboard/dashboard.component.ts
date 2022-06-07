import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { IPostResponse, IUser, IUserResponse } from './dash-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private route: Router, private userService: UserService) { }

  static currentTab:number = 0;

  get staticurrentTab() {
    return DashboardComponent.currentTab;
  }

  ngOnInit(): void {
    this.getUserData();
    if(this.userService.subCycleId == '' || this.userService.subCycleId == this.user?.cycles[this.user.cycles.length-1].subCycles[0]._id){
      this.userService.sendTasks(this.user?.cycles[this.user.cycles.length-1].subCycles[0].tasks);
    }
    else if(this.userService.subCycleId == this.user?.cycles[this.user.cycles.length-1].subCycles[1]._id){
      this.userService.sendTasks(this.user?.cycles[this.user.cycles.length-1].subCycles[1].tasks);
    }
    else{
      this.userService.sendTasks(this.user?.cycles[0].subCycles[2].tasks);
    }
  }

  user!: IUser;

  getUserData() {
    this.userService.apiGetUserData().subscribe((response: IUserResponse) => {
      this.user = response.data;
      console.log(response.data);
      
      console.log(DashboardComponent.currentTab);
      
      this.userService.sendTasks(this.user.cycles[this.user.cycles.length-1].subCycles[DashboardComponent.currentTab].tasks);

      this.userService.getIds(this.user.cycles[this.user.cycles.length-1]._id, this.user.cycles[this.user.cycles.length-1].subCycles[DashboardComponent.currentTab]._id, DashboardComponent.currentTab);
    })
  }

  getFromDate(i:number) {
    if (this.user?.cycles.length) {
      return this.user.cycles[this.user.cycles.length-1].subCycles[i].from;
    }
    return '';
  }

  getToDate(i:number) {
    if (this.user?.cycles.length) {
      return this.user.cycles[this.user.cycles.length-1].subCycles[i].to;
    }
    return '';
  }

  getData(cycleId:string, subCycleId:string, subCycleNo:number){
    DashboardComponent.currentTab = subCycleNo;
    console.log(DashboardComponent.currentTab);
    this.userService.sendTasks(this.user.cycles[this.user.cycles.length-1].subCycles[subCycleNo].tasks);
    this.userService.getIds(cycleId, subCycleId, subCycleNo);
  }

  checkDate(){
    const curYear = new Date().getFullYear();
    // const curYear = 2038;
    if(curYear == this.user?.cycles[this.user.cycles.length-1].to){
      return true;
    }
    return false;
  }

  createNextCycle(){
    this.userService.apiNextCycle().subscribe((response:IPostResponse) => {
      console.log(response);
      this.getUserData()
      alert('Here\'s your new set of activities for the next 9 years!');
    },
    (err) => {
      console.log(err);
      alert('Something went wrong. Please try later.');
    }
    ) 
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.route.navigate(['auth']);
  }
} 
