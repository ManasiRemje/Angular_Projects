import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FileService } from 'src/app/file-upload/file.service';
import { AdminService } from '../admin.service';
import { IRequestData } from '../requests/request-data';
import { IPopup, IPopupData, IUser, IUserData } from './user-data';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private router:Router, private adminService:AdminService, private fileService:FileService) {
    this.clickEventSubscription = this.fileService.getClickEvent().subscribe(() => {
      this.closePopup();
    })
   }

  clickEventSubscription!: Subscription;

  ngOnInit(): void {
    this.getUsers();
    console.log(this.users);
  }

  users:IUserData[] = [
  ];

  oneUser!:IPopupData;

  isUserVisible = false;
  noUser = false;

  pageSizeForm = new FormGroup({
    pageSize: new FormControl(''),
  })


  closePopup() {
    this.isUserVisible = false;
  }

  pageSize:number = 0;
  pageNumber:number = 0;


  setPageSize(){
    console.log(this.pageSizeForm.value);
    this.pageSize = this.pageSizeForm.value.pageSize;
    this.paginator('')
  }

  paginator(move:string){
      if(move == 'back'){
        this.pageNumber -= 1;
      }
      else if (move =='next'){
        this.pageNumber += 1;
      }
      else{
        this.pageNumber = 1;
      }
      console.log(this.pageNumber);
      if(this.pageNumber <= 0){
        this.pageNumber = 1;
      }
      this.adminService.apiPaginator(this.pageSize,this.pageNumber).subscribe((response:IUser) => {
        console.warn(response);
        this.users = response.data;
      })
  }

  getUsers(){
    this.adminService.apiGetUsers().subscribe((response:IUser) => {
      console.warn(response);
      this.users = response.data;
      console.log(this.users);
    })
  }

  showUser(id:string){
    this.isUserVisible = true;
    this.adminService.apiShowUser(id).subscribe((response:IPopup) => {
      console.warn(response);
      this.oneUser = response.data[0];
      console.log(this.users);
    })
  }

  routeToRequest(){
    this.router.navigate(['admin/requests']);
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.router.navigate(['auth/login']);
  }

}
