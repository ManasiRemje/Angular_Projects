import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  constructor(private apiService: AdminService) { }

  ngOnInit(): void {
  }

  customerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.minLength(10)),
    address: new FormControl('', Validators.required),
  });

  onSubmit() {
    console.log(this.customerForm.value);
    this.apiService.addCustomer(this.customerForm.value).subscribe(response => {
      console.warn('Submitted');
      if(response.data == 'BAD REQUEST' || response.error != null){
        alert('Validation Failed ! Please check values entered.');
        return;
      }
      alert('Customer Created');
    })
  }
}
