import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from '../../services/customer.service';
import { StoragesService } from '../../../../auth/auth-components/services/storages/storages.service';

@Component({
  selector: 'app-book-a-car',
  templateUrl: './book-a-car.component.html',
  styleUrl: './book-a-car.component.scss',
})
export class BookACarComponent {
  id: number = this.activatedRoute.snapshot.params['id'];
  car: any;
  bidForm: FormGroup;
  isSpinning: boolean = false;


  constructor(
    private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bidForm = this.fb.group({
      price: [null, [Validators.required]],
    });
    this.getCar();
  }

  getCar() {
    this.service.getCarById(this.id).subscribe((res) => {
      console.log(res);
      this.car = res;
    });
  }

  bidACar(formData:any) {
    this.isSpinning = true;
    const obj = {
      price: formData.price,
      userId: StoragesService.getUserId(),
      carId: this.id,
    };

    this.service.bidACar(obj).subscribe(
      (res) => {
        this.message.success('Bid submitted successfully', {
          nzDuration: 3000,
        });
        this.router.navigateByUrl('/customer/dashboard');
      },
      (error) => {
        this.message.error('Something went wrong', { nzDuration: 3000 });
      }
    );
  }
}
