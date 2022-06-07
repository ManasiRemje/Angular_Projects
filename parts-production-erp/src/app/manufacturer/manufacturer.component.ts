import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthApiService } from '../auth-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.scss']
})
export class ManufacturerComponent implements OnInit {

  constructor(private authService: AuthApiService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getPendingPOs();
  }

  pos: any = []

  getPendingPOs() {
    this.apiService.apiPending().subscribe((response: any) => {
      console.warn(response);
      this.pos = response.data;
    })
  }

  makeManufactured(i: number) {
    console.log(i);
    const objectToSend = {
      _id: this.pos[i]._id,
    }
    this.apiService.apiSendManufactured(objectToSend).subscribe((response: any) => {
      this.getPendingPOs();
      alert(`PO ID ${this.pos[i]._id} is updated to manufactured !`);
    })
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['login']);
  }

}
