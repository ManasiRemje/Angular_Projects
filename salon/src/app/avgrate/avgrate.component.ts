import { Component, ViewChild } from '@angular/core';
import { SalonapiService } from '../salonapi.service';
import { FormControl, FormGroup } from '@angular/forms';
import { matExpansionAnimations } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

// export interface PeriodicElement {
//   OverallExperienceRating: number;
//   ServiceRating: number;
//   ambienceRating: number;
//   cleanlinessRating: number;
//   comments: string;
//   createdAt: string;
//   overallAverage: number;
//   customerName: string;
//   customerAge: string;
//   customerEmail: string;
// }

@Component({
  selector: 'app-avgrate',
  templateUrl: './avgrate.component.html',
  styleUrls: ['./avgrate.component.scss']
})
export class AvgrateComponent {

  constructor(private salonService: SalonapiService) { }

  selectedValue1 = '';
  selectedValue2: any = '';
  selectedValue3 = '';

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  ratings: any = [];

  numbers: any = [1, 2, 3, 4, 5];

  employees: any = [
    { name: 'adam', id: 1 },
    { name: 'arjun', id: 2 }
  ];
  services: any = [
    { id: 1, name: 'nail' },
    { id: 2, name: 'hair' }
  ];

  displayedColumns: string[] = ['Overall-Rating', 'Service-Rating', 'Ambience-Rating', 'Cleanliness-Rating', 'Comments', 'Created-At', 'Overall-Average', 'Customer-Name', 'Customer-Age', 'Customer-Email'];
  
  filteredData: any = [
    {
      OverallExperienceRating: 1, ServiceRating: 1, ambienceRating: 2, cleanlinessRating: 1, comments: "Hey", createdAt: "2022-03-24T11:48:05.410Z", overallAverage: 3.5, customerName: "manish", customerAge: "22",
      customerEmail: "manish.sawlani@coditas.com"
    },
    {
      OverallExperienceRating: 1, ServiceRating: 1, ambienceRating: 2, cleanlinessRating: 1, comments: "Hey", createdAt: "2022-03-24T11:48:05.410Z", overallAverage: 3.5, customerName: "manish", customerAge: "22",
      customerEmail: "manish.sawlani@coditas.com"
    },
    {
      OverallExperienceRating: 1, ServiceRating: 1, ambienceRating: 2, cleanlinessRating: 1, comments: "Hey", createdAt: "2022-03-24T11:48:05.410Z", overallAverage: 3.5, customerName: "manish", customerAge: "22",
      customerEmail: "manish.sawlani@coditas.com"
    }
  ];

  dataSource:any = [];

  logChange(index: any) {
    console.log(index);
  }

  filterForm = new FormGroup({
    servicedAvailed: new FormControl(''),
    serviceBy: new FormControl(''),
    overallAverage: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
  });

  registerForm = new FormGroup({
    customerName: new FormControl(''),
    customerAge: new FormControl(''),
    customerEmail: new FormControl(''),
    password: new FormControl(''),
    userRole: new FormControl(''),
  });

  serviceForm = new FormGroup({
    serviceName: new FormControl(''),
  });

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

  getFilteredData(data: any) {
    this.dataSource = this.filteredData;
    // this.filteredData = this.salonService.apiFilter(data).subscribe(response => {
    //   console.warn(this.filteredData);
    // })
  }

  registerUser(data: any) {
    this.salonService.apiRegister(data).subscribe(response => {
      console.warn();
    })
  }

  ngOninit() {
    this.getEmployees();
    this.getServices();
  }

  onSubmit() {
    console.log(this.filterForm.value);
    this.getFilteredData(this.filterForm.value);
  }

  onSubmitRegister() {
    this.registerUser(this.registerForm.value);
  }


  onSubmitAddService() {
    // this.servicApi = this.serviceForm.value;
    console.log(this.serviceForm.value);
  }

}
