import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
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

  get confirmPassword(){
    return this.signUpForm.get('confirmPassword') as FormControl;
  }

  onSubmit(){
    console.log(this.signUpForm.value);
    const newPass = this.signUpForm.get('password')?.value;
    const confirmPass = this.signUpForm.get('confirmPassword')?.value;
    console.log(newPass + confirmPass);

    if(newPass == confirmPass){
      this.registerUser(this.signUpForm.value);
      this.signUpForm.reset();
    }
    else{
      alert('The passwords do not match');
    }
  }

  registerUser(data:IRegister){
    this.authService.apiRegister(data).subscribe(response => {
      alert('You are signed up!');
      this.router.navigate(['auth']);
      console.warn(response);
    },
    (err) => {
      // console.log(err);
      alert('Invalid details');
    }
    )
  }

}
