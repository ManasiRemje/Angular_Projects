import { Component, Input, OnInit } from '@angular/core';
import { ITasks } from 'src/app/user/dashboard/dash-data';
import { UserService } from 'src/app/user/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-box',
  templateUrl: './display-box.component.html',
  styleUrls: ['./display-box.component.scss']
})
export class DisplayBoxComponent implements OnInit {

  dataEventSubscription!: Subscription;

  @Input() category: string = '';
  tasks!:ITasks[];
  procedural!:ITasks[];
  clinical!:ITasks[];
  documental!:ITasks[];
  

  // constructor(private userService: UserService) {
  //   this.dataEventSubscription = this.userService.getTasks().subscribe((response:ITasks[]) => {
  //     this.tasks = response;
  //     console.log(this.tasks);

  //   })
  // }

  ngOnInit(): void {
    
   
  }

}
