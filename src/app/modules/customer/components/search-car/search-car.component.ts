import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
})
export class SearchCarComponent {

  
  listOfMarque =["BMW", "AUDI", "FERRARI","TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN","HYUNDAI","LEXUS", "KIA", "SUZIKI", "MUTSHIBUZI","AUTRE..."];
  listOfType = ["Gasoline","Diesel"];
  listOfColor =["Red","White","Blue", "Black","Orange","Yellow","Grey", "Silver", "Autre..."];
  listOfTransmission = ["Manuel","Automatic"];
  searchCarForm: FormGroup;
  isSpinning : boolean = false;

  constructor(private service: CustomerService,
    private fb: FormBuilder,
 
    ){}
  
    ngOnInit(){
      this.searchCarForm= this.fb.group({
        marque: [null],
        name: [null],
        type: [null],
        transmission:[null],
        color: [null],
      })
    };

    searchCar(){
      console.log(this.searchCarForm.value);
    }
    
}
