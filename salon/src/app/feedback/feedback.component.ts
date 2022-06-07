import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SalonapiService } from '../salonapi.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  selectedValue = '';
  selectedValue2: any = [];

  employees: any = [];
  services: any = [];

  registerForm = new FormGroup({
    customerName: new FormControl(''),
    customerAge: new FormControl(''),
    customerEmail: new FormControl(''),
    comments: new FormControl(''),
    servicedAvailed: new FormControl(''),
    serviceBy: new FormControl(''),
    ambienceRating: new FormControl(''),
    cleanlinessRating: new FormControl(''),
    ServiceRating: new FormControl(''),
    OverallExpereinceRating: new FormControl(''),
  });

  constructor(private salonService: SalonapiService) { }

  submitFeed(data: any) {
    this.salonService.sendFeedback(data).subscribe(response => {
      console.warn();
    })
  }

  getEmployees() {
    this.salonService.apiEmployees().subscribe(response => {
      console.warn();
      this.employees = response;
    })
  }

  getServices() {
    this.salonService.apiServices().subscribe(response => {
      console.warn();
      this.services = response;
    })
  }

  ngOninit() {
    this.getEmployees();
    this.getServices();
  }

  onSubmit() {
    console.warn(this.registerForm.value);
    this.submitFeed(this.registerForm.value);
  }

}