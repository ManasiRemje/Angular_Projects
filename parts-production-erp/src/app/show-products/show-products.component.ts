import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.scss']
})
export class ShowProductsComponent implements OnInit {

  constructor(private apiService: AdminService, private apiMaster: MasterService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  displayedColumns: string[] = ['Product', 'Unit-Price'];

  products:any = [];

  getAllProducts() {
    this.apiMaster.apiProducts().subscribe((response: any) => {
      console.warn(response);
      this.products = response.data;
    })
  }

}
