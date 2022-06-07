import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MasterService } from '../master.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-po',
  templateUrl: './create-po.component.html',
  styleUrls: ['./create-po.component.scss']
})
export class CreatePOComponent implements OnInit {

  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router, private masterService: MasterService) {
    this.poFG = fb.group({ customerID: new FormControl('', Validators.required), products: fb.array([this.addProduct()]) });
  }

  customers: any = [];
  productsReceived: any = [];
  productno = 0;

  selectedValue1 = '';
  selectedValue2 = '';

  public poFG: FormGroup;
  public products !: FormArray;

  ngOnInit(): void {
    this.getProducts();
    this.getCustomers();
  }

  get productsControls(): any {
    return (this.poFG.get('products') as FormArray)['controls'];
  }

  addProduct(): FormGroup {
    return this.fb.group({
      product: '',
      quantity: '',
      dimensions: '',
    });
  }

  onSubmitAddPO() {
    console.log(this.poFG.value);
    this.apiService.createPO(this.poFG.value).subscribe(response => {
      console.warn(response);
      this.products.clear();
      this.products.push(this.addProduct());
      this.poFG.reset();

    })
  }

  getProducts() {
    this.masterService.apiProducts().subscribe((response: any) => {
      console.warn(response);
      this.productsReceived = response.data;
    })
  }

  getCustomers() {
    this.masterService.apiCustomers().subscribe((response: any) => {
      console.warn(response);
      this.customers = response.data;
    })
  }

  addForm() {
    this.products = this.poFG.get('products') as FormArray;
    this.products.push(this.addProduct());
  }

  removeForm(i: number) {
    console.log(i);
    this.products.removeAt(i);
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['login']);
  }
}
