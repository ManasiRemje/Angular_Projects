import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthApiService } from '../auth-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  constructor(private authService: AuthApiService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getStoredPOs();
  }

  pos: any = [];

  getStoredPOs() {
    this.apiService.apiStoredPOs().subscribe((response: any) => {
      console.warn('Here :' +  response);
      this.pos = response.data;
    })
  }

  makeDelivered(i: number) {
    const objectToSend = {
      _id: this.pos[i]._id,
    }
  
    this.apiService.apiSendDelivered(objectToSend).subscribe((response: any) => {
      this.getStoredPOs();
      alert(`PO ID ${this.pos[i]._id} is successfully delivered!`);
    })
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['login']);
  }

}
