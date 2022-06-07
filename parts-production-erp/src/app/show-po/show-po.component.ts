import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../auth-api.service';

@Component({
  selector: 'app-show-po',
  templateUrl: './show-po.component.html',
  styleUrls: ['./show-po.component.scss']
})
export class ShowPoComponent implements OnInit {

  constructor(private authService: AuthApiService) { }

  ngOnInit(): void {
    this.getAllPOs();
  }

  pos: any = [];

  getAllPOs() {
    this.authService.apiPOs().subscribe((response: any) => {
      console.warn(response);
      this.pos = response.data;
    })
  }
}
