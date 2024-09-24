import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-book-a-car',
  templateUrl: './book-a-car.component.html',
  styleUrl: './book-a-car.component.scss',
})
export class BookACarComponent {
  id: number = this.activatedRoute.snapshot.params['id'];
  car: any;

  constructor(
    private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCar();
  }

  getCar() {
    this.service.getCarById(this.id).subscribe((res) => {
      console.log(res);
      this.car = res;
    });
  }
}
