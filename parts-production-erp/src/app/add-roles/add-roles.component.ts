import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss']
})
export class AddRolesComponent implements OnInit {

  constructor(private apiService: AdminService, private fb: FormBuilder) { }

  roleForm = this.fb.group({
    name: ['', Validators.required],
    email: [''],
    role: [''],
    shift: this.fb.group({
      time: [null],
      furnaceID: [null],
    })
  })

  get name() {
    return this.roleForm.get('name');
  }

  ngOnInit(): void {
    this.getFurnaceIDs();
    this.getRoleIDs();
  }

  getFurnaceIDs() {
    this.apiService.apiFurnaces().subscribe((response: any) => {
      console.warn(response);
      this.furnaces = response.data;
    })
  }

  getRoleIDs() {
    this.apiService.apiRoles().subscribe((response: any) => {
      console.warn(response);
      this.roles = response.data;
    })
  }

  roles: any = [];

  furnaces: any = [];

  shifts = [{ shift: 'morning' }, { shift: 'evening' }];

  selectedValue1 = '';
  selectedValue2 = null;
  selectedValue3 = null;

  showFields: boolean = false;

  onSubmit() {
    console.log(this.roleForm.value);
    this.apiService.addPersonal(this.roleForm.value).subscribe(response => {
      console.warn(response);
      this.roleForm.reset();
      this.showFields = false;

      if(response.error != null){
        alert('Validation Failed ! Please check values entered.');
        return;
      }
      alert('User Created');
    })
  }

  onSelectShow(event: any) {
    console.log(this.selectedValue1);
    if (this.selectedValue1 == '62442d60f192c3c376008689') {
      this.showFields = true;
    }
    else {
      this.showFields = false;
    }
  }

}
