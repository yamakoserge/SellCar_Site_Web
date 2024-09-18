import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  
  cars:any=[];

  constructor(private service:AdminService){}

  ngOnInit(){
    this.getCars();
  }

  getCars(){
    this.service.getAllCars().subscribe((res) =>{
      console.log(res);
      this.cars = res;
    })
  }
}

