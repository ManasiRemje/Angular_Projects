import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthApiService } from '../auth-api.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  constructor(private authService: AuthApiService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getManufacturedPOs();
    this.getRacks();
  }

  pos: any = [];

  racks: any = [];

  selectedValue1 = '';

  rackForm = new FormGroup({
    rackName: new FormControl(''),
  });

  getManufacturedPOs() {
    this.apiService.apiManufacturedPOs().subscribe((response: any) => {
      console.warn(response);
      this.pos = response.data;
    })
  }

  getRacks() {
    this.apiService.apiRacks().subscribe((response: any) => {
      this.racks = response.data;
    })
  }

  makeStored(i: number) {
    console.log(i);
    this.pos[i].isStored = !this.pos[i].isStored;
    const objToSend = {
      _id: this.pos[i]._id, storageLocation: this.rackForm.get('rackName')?.value
    }
   
    this.apiService.apiMakeStored(objToSend).subscribe((response: any) => {
     
      this.getManufacturedPOs();
      alert(`PO ID ${this.pos[i]._id} is updated to stored!`);
      this.rackForm.reset();
    })
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['login']);
  }
}
