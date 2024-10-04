import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
})
export class SearchCarComponent {

  
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
  searchCarForm: FormGroup;
  isSpinning: boolean = false;
  cars: any[] = [];

  constructor(private service: AdminService, 
    private fb: FormBuilder) {}

  ngOnInit() {
    this.searchCarForm = this.fb.group({
      marque: [null],
      name: [null],
      type: [null],
      transmission: [null],
      color: [null],
    });
  }

  searchCar() {
    this.isSpinning = true;
    this.cars = [];
    this.service.searchCar(this.searchCarForm).subscribe((res) => {
      this.isSpinning = false;
      this.cars = res;
    });
  }
}
