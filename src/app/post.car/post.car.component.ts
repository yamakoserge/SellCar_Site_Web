import { Component } from '@angular/core';
import { CustomerService } from '../modules/customer/services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { BooleanInput } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-post.car',
  templateUrl: './post.car.component.html',
  styleUrls: ['./post.car.component.scss']
})
export class PostCarComponent {

  listOfBrands =["BMW", "AUDI", "FERRARI","TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN","HYUNDAI","LEXUS", "KIA", "SUZIKI", "MUTSHIBUZI","AUTRE..."];
  listOfType = ["Gasoline","Diesel", "Hybrid", "Electric"];
  listOfColor =["Red","White","Blue", "Black","Orange","Yellow","Grey", "Silver", "Autre..."];
  listOfTransmission = ["Manuel","Automatic"];
  postCarForm: FormGroup;
  isSpinning : BooleanInput = false;

  constructor(private service: CustomerService,
  private fb: FormBuilder,
  private router: Router,
  private message: NzMessageService
  ){}

  ngOnInit(){
    this.postCarForm= this.fb.group({
      brand: [null, [Validators.required]],
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      transmission:[null, [Validators.required]],
      color: [null, [Validators.required]],
      year: [null, [Validators.required]],
      description:[null, [Validators.required]],
      price:[null, [Validators.required]],
    })
  };
  postCar(){
    console.log(this.postCarForm.value);
  }


}
