import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { IData } from './list-data';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  constructor(private route: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  users:any[] = [];
  length = 0;
  initialYear = 2022;
  pageSize:number = 5;
  pageNumber:number = 1;

  filterForm = new FormGroup({
    year: new FormControl(0, [Validators.required, Validators.min(2000)])
  })

  get year() {
    return this.filterForm.get('year') as FormControl;
  }

  pageSizeForm = new FormGroup({
    page: new FormControl(0, [Validators.required])
  })

  getUsers(){
    this.adminService.apiGetUsers(1,5,2022).subscribe((response: IData) => {
      this.users = response.data.users;
      console.log(this.users);
      if(this.users.length == 0){
        this.length = 1;
      }
    })
  }

  onSubmit(){
    this.length = 0;
    this.filterUsers();
  }

  filterUsers(){
    const year = this.filterForm.get('year')!.value;
    this.initialYear = year;
    this.adminService.apiGetUsers(1,5,year).subscribe((response: IData) => {
      this.users = response.data.users;
      console.log(this.users);
      if(this.users.length == 0){
        this.length = 1;
      }
    })
  }

  setPageSize(){
    this.pageSize = this.pageSizeForm.value.page;
    console.log(this.pageSize);
    this.paginator('')
  }

  paginator(move:string){
      if(move == 'back'){
        this.pageNumber -= 1;
        this.length = 0;
      }
      else if (move =='next'){
        this.pageNumber += 1;
      }
      else{
        this.pageNumber = 1;
      }
      
      if(this.pageNumber <= 0){
        this.pageNumber = 1;
      }
      
      this.adminService.apiGetUsers(this.pageNumber, this.pageSize, this.initialYear).subscribe((response:IData) => {
        this.users = response.data.users;
          if(this.users.length == 0){
            this.length = 2;
          }
      })
  }

  block(id:string){
    this.adminService.apiBlockUser(id).subscribe(response => {
      this.getUsers();
      alert('User Blocked and Email sent to user')
    },
    (err) => {
      // alert(err.data.error.error.message);
      alert('Something went wrong');
    }
    )
  }

  unblock(id:string){
    this.adminService.apiUnblockUser(id).subscribe(response => {
      alert('User Unblocked and Email sent to user')
      this.getUsers();
    },
    (err) => {
      // console.log(err);
      // alert(err.error.error.message);
      alert('Something went wrong');
    }
    )
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.route.navigate(['auth']);
  }

}
