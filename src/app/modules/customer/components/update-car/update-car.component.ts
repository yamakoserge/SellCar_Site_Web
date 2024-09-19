import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.scss'
})
export class UpdateCarComponent {

  id:number = this.activatedRoute.snapshot.params["id"];
  car:any

  constructor(private service:CustomerService,
    private activatedRoute:ActivatedRoute
  ){}

  ngOnInit(){
    this.getCars();
  }

  getCars(){
    this.service.getCarById(this.id).subscribe((res) =>{
      console.log(res);
      this.car = res;
    })
  }
}
