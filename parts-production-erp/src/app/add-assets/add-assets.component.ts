import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-assets',
  templateUrl: './add-assets.component.html',
  styleUrls: ['./add-assets.component.scss']
})
export class AddAssetsComponent implements OnInit {

  constructor(private apiService: AdminService) { }

  ngOnInit(): void {
  }

  // tabs
  logChange(index: any) {
    console.log(index);
  }


  furnaceForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  storageForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    material: new FormControl('', Validators.required),
    defaultDimensionsPrice: new FormControl('', Validators.required),
  });

  onSubmitAddFurnace(){
    console.log(this.furnaceForm.value);
    this.apiService.createFurnace(this.furnaceForm.value).subscribe(response => {
      console.warn(response);
      this.furnaceForm.reset();
      if(response.error != null){
        alert('Validation Failed ! Please check value entered.');
        return;
      }
      alert('Furnace Created');
    })
  }

  onSubmitAddStorage(){
    console.log(this.storageForm.value);
    this.apiService.createStorage(this.storageForm.value).subscribe(response => {
      console.warn(response);
      this.storageForm.reset();
      if(response.error != null){
        alert('Validation Failed ! Please check value entered.');
        return;
      }
      alert('Storage Created');
    })
  }

  onSubmitAddProduct(){
    console.log(this.productForm.value);
    this.apiService.addProduct(this.productForm.value).subscribe(response => {
      console.warn(response);
      this.productForm.reset();
      if(response.data == 'BAD REQUEST' || response.error != null){
        alert('Validation Failed ! Please check values entered.');
        return;
      }
      alert('Product Created');
    })
  }
}
