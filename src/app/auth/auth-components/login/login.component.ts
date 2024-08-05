import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoragesService } from '../services/storages/storages.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!:FormGroup;
  isSpinning: boolean =false;
 


  constructor(private fb: FormBuilder,
  private router: Router,
  private service: AuthService,
  private message: NzMessageService,


  ){
   this.loginForm = this.fb.group({
      email: [null, [Validators.required,Validators.email]],
      password: [null, [Validators.required]],
    })
  }


 login(){
    this.isSpinning = true;
    this.service.login(this.loginForm.value).subscribe((res) => {
      if (res.userId != null){
        const user = {
          id: res.userId,
          role: res.userRole
        }
        StoragesService.saveUser(user);
        StoragesService.saveToken(res.jwt);
        if(StoragesService.isAdminLoggedIn())
          this.router.navigateByUrl("/admin/dashbord");
        else if (StoragesService.isCustomerLoggedIn())
          this.router.navigateByUrl("/customer/dashboard");     
      }else{
        this.message.error("Bad credentials",{nzDuration:3000})
      }
      this.isSpinning = false;
    })
  }
  
}
