import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SalonapiService } from '../salonapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private salonService: SalonapiService, private router: Router) {}

  ngOnInit(): void {
    
  }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit(){
    console.warn(this.loginForm.value);
    this.loginUser(this.loginForm.value);
  }

  loginUser(data:any){
    this.salonService.apiLogin(data).subscribe(response => {
      const token = response.data.token;
      if(token){
        this.router.navigate(['login']);
      }
    },
      (err) => {
        alert('Invalid details');
      }
    );
  }

}
