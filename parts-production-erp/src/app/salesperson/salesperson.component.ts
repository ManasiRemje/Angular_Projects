import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthApiService } from '../auth-api.service';

@Component({
  selector: 'app-salesperson',
  templateUrl: './salesperson.component.html',
  styleUrls: ['./salesperson.component.scss'],
})
export class SalespersonComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    
  }

  

}
