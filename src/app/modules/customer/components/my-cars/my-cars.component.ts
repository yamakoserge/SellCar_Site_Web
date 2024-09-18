import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrl: './my-cars.component.scss'
})
export class MyCarsComponent {

  cars:any=[];

  constructor(private service:CustomerService){}

  ngOnInit(){
    this.getCars();
  }

  getCars(){
    this.service.getMyCars().subscribe((res) =>{
      console.log(res);
      this.cars = res;
    })
  }
}
