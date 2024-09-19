import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss'],
})
export class UpdateCarComponent {
  id: number = this.activatedRoute.snapshot.params['id'];
  car: any;
  existingImage: string | null = null;

  listOfMarque = [
    'BMW',
    'AUDI',
    'FERRARI',
    'TESLA',
    'VOLVO',
    'TOYOTA',
    'HONDA',
    'FORD',
    'NISSAN',
    'HYUNDAI',
    'LEXUS',
    'KIA',
    'SUZIKI',
    'MUTSHIBUZI',
    'AUTRE...',
  ];
  listOfType = ['Gasoline', 'Diesel'];
  listOfColor = [
    'Red',
    'White',
    'Blue',
    'Black',
    'Orange',
    'Yellow',
    'Grey',
    'Silver',
    'Autre...',
  ];
  listOfTransmission = ['Manuel', 'Automatic'];
  updateCarForm: FormGroup;
  isSpinning: boolean = false;

  constructor(
    private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.updateCarForm = this.fb.group({
      marque: [null, [Validators.required]],
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      transmission: [null, [Validators.required]],
      color: [null, [Validators.required]],
      year: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
    this.getCar();
  }

  getCar() {
    this.service.getCarById(this.id).subscribe((res) => {
      console.log(res);
      this.car = res;
      this.existingImage = `data:image/jpeg;base64,` + res.returnedImg;
      this.updateCarForm.patchValue(res);
    });
  }

  updateCar() {}
}
