import { Component } from '@angular/core';
import { StoragesService } from './auth/auth-components/services/storages/storages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sellcarweb';

  isAdminLoggedIn: Boolean=StoragesService.isAdminLoggedIn();
  isCustomerLoggedIn: Boolean=StoragesService.isCustomerLoggedIn();

  constructor(private router: Router){}

  ngOninit(){
    this.router.events.subscribe(evet =>{
      if(event.constructor.name === "NavigationEnd"){
        this.isAdminLoggedIn = StoragesService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StoragesService.isCustomerLoggedIn();
      }
    })

  }

  logout(){
    StoragesService.signout();
    this.router.navigateByUrl("/login");
  }


}
