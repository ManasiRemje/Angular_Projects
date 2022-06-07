import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { IApprove, IFilter, IRequest, IRequestData } from './request-data';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  constructor(private router:Router, private adminService:AdminService) { }

  ngOnInit(): void {
    this.getAllRequests();
  }

  requests:IRequestData[] = [
  ]

  isApproved:string = '';

  filterForm = new FormGroup({
    status: new FormControl(''),
  })

  statusAll:string[] = [
    'Approved', 'Pending'
  ]

  routeToUserList(){
    this.router.navigate(['admin']);
  }

  onFilterSubmit(){
    this.filterRequests(this.filterForm.value.status);
  }

  pageSizeForm = new FormGroup({
    pageSize: new FormControl(''),
  })

  getAllRequests(){
    this.adminService.apiGetRequests().subscribe((response:IRequest) => {
      this.requests = response.data;
    })
  }

  filterRequests(data: string){
    this.adminService.apiFilter(data).subscribe((response:IRequest) => {
      this.requests = response.data;
    })
  }

  pageSize:number = 0;
  pageNumber:number = 0;

  setPageSize(){
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
      if(this.pageNumber <= 0){
        this.pageNumber = 1;
      }
      this.adminService.apiPaginatorRequests(this.pageSize,this.pageNumber)
      .subscribe((response:IRequest) => {
        console.warn('Paginator' + response);
        this.requests = response.data;
        console.log(this.requests);
      })
  }

  approveRequest(id:string){
    console.log(id);
    const obj:IApprove = {
      _id:id, status: "Approved"
    }
    console.log(obj);
    this.adminService.apiApproveUser(obj).subscribe((response:any) => {
      console.warn(response);
      this.getAllRequests();
    })
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.router.navigate(['auth/login']);
  }

}
