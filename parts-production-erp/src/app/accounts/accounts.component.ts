import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthApiService } from '../auth-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  constructor(private authService: AuthApiService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPOs();
  }

  pos: any = [];

  getAllPOs() {
    this.authService.apiPOs().subscribe((response: any) => {
      // console.warn(response);
      this.pos = response.data;
      console.warn(this.pos);
    })
  }
  
  makePaymentDone(i: number) {
    const objectToSend = {
      _id: this.pos[i]._id,
    }
  
    this.apiService.apiConfirmPayment(objectToSend).subscribe((response: any) => {
      alert(`PO ID ${this.pos[i]._id} is updated to payment done!`);
      this.getAllPOs();
    })
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['login']);
  }
}
