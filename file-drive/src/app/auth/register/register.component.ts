import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IRegister } from './register-data';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  signUpButtonName = 'Sign Up!'

  signUpForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  get name(){
    return this.signUpForm.get('name') as FormControl;
  }

  get email(){
    return this.signUpForm.get('email') as FormControl;
  }

  get password(){
    return this.signUpForm.get('password') as FormControl;
  }

  onSubmit(){
    console.log(this.signUpForm.value);
    this.registerUser(this.signUpForm.value);
    this.router.navigate(['auth/login']);
    this.signUpForm.reset();
  }

  registerUser(data:IRegister){
    this.authService.apiRegister(data).subscribe(response => {
      console.warn(response);
    })
  }

}
