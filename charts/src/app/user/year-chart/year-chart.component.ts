import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { IYear, IYearData } from './year-data';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-year-chart',
  templateUrl: './year-chart.component.html',
  styleUrls: ['./year-chart.component.scss']
})
export class YearChartComponent implements OnInit {
  constructor(private router:Router, private userService:UserService) { 
    Chart.register(...registerables);
  }

  chartData:IYearData[] = [];
  labels:number[] = [];
  xData:number[] = [];
  chart:any = [];

  
  ngOnInit(): void {
    this.getChart();
  }

  getChart(){
    this.userService.apiGetYearChart().subscribe((response:IYear) => {
      this.chartData = response.data;
      console.log(this.chartData);

      this.labels = response.data.map(x => x.year);
      console.log(this.labels);
      
      this.xData = this.chartData.map(x => x.sales);
      console.log(this.xData);

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [{
            label: 'Sales',
            data: this.xData,
            borderWidth: 3,
            fill: false,
            backgroundColor: '#44e3ce',
            borderColor: '#2439b0',
            // tension: 0.1
          }]
        }
      })
      
    })
  }

  routeToDailyChart(){
    this.router.navigate(['user/days']);
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.router.navigate(['auth']);
  }

}
