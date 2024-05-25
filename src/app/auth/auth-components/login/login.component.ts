import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!:FormGroup;
  nzSpinning: boolean = false;


  constructor(private fb: FormBuilder){
   this.loginForm = this.fb.group({
      email: [null, [Validators.required,Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  login(){
    console.log(this.loginForm.value);
  }
  
}