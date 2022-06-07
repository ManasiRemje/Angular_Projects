import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Chart, registerables } from 'chart.js';
import { io } from 'socket.io-client';
import { IDaily, IData } from './days-data';

@Component({
  selector: 'app-days-chart',
  templateUrl: './days-chart.component.html',
  styleUrls: ['./days-chart.component.scss']
})
export class DaysChartComponent implements OnInit {

  constructor(private router:Router, private userService:UserService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getChart();
    const socket = io('https://5b2e-1-22-124-182.ngrok.io');

    // socket.on('connect', () => {
    //   console.log('Connected');
    // });

    socket.on('daily-data', (response: IData) => {
      console.log(response);

      this.chartObject = {
        sales: response.sales,
        date: response.date
      } 
      console.log(this.chartObject);
      
      if(this.chartData.length === 10){
        const nineElements = this.chartData.slice(1);
        console.log(nineElements);
        this.chartData = nineElements;
        this.chartData.push(this.chartObject);
        console.log(this.chartData);
      }
      else{
        this.chartData.push(this.chartObject);
      }
      this.xData = this.chartData.map(x => x.sales);
      console.log(this.xData);
      
      this.yData = this.chartData.map(x => x.date.toString().slice(0,10));
      console.log(this.yData);

      this.chart.destroy();
      this.plotChart();
    });
  }

  xData:number[] = [];
  yData:String[] = [];
  chart:any = [];
  chartData:IData[] = [];
  chartObject!:IData;

  plotChart(){
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.yData,
        datasets: [{
          label: 'Sales',
          data: this.xData,
          borderWidth: 3,
          fill: false,
          backgroundColor: '#44e3ce',
          borderColor: '#2439b0'
        }]
      }
    })
  }

  getChart(){
      this.userService.apiGetDailyChart().subscribe((response:IDaily) => {
      console.log(response.data);

      if(response.data.length > 10){
        response.data = response.data.slice(-10);
      }

      this.chartData = response.data;

      this.xData = this.chartData.map(y => y.sales);
      console.log(this.xData);
      
      this.yData = this.chartData.map(x => x.date.toString().slice(0,10));
      console.log(this.yData);

      this.plotChart();
    })
  }

  routeToYearlyChart(){
    this.router.navigate(['user']);
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.router.navigate(['auth']);
  }

}
