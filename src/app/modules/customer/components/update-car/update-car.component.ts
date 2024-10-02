import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoragesService } from '../../../../auth/auth-components/services/storages/storages.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss'],
})
export class UpdateCarComponent {
  id: number = this.activatedRoute.snapshot.params['id'];
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
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  imgChanged: boolean = false;
  

  constructor(
    private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
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
      this.existingImage = `data:image/jpeg;base64,` + res.returnedImg;
      this.updateCarForm.patchValue(res);
    });
  }

  updateCar() {
    this.isSpinning = true;
    const formData: FormData = new FormData();
    formData.append('img', this.selectedFile);
    formData.append('marque', this.updateCarForm.get('marque').value);
    formData.append('name', this.updateCarForm.get('name').value);
    formData.append('type', this.updateCarForm.get('type').value);
    formData.append('color', this.updateCarForm.get('color').value);
    formData.append('model', this.updateCarForm.get('year').value);
    formData.append(
      'transmission',
      this.updateCarForm.get('transmission').value
    );
    formData.append('description', this.updateCarForm.get('description').value);
    formData.append('price', this.updateCarForm.get('price').value);
    formData.append('userId', StoragesService.getUserId());

    this.service.updateCar(this.id, formData).subscribe(
      (res) => {
        this.isSpinning = false;
        this.message.success('Car updated successfully', { nzDuration: 3000 });
        this.router.navigateByUrl('/customer/dashboard');
      },
      (error) => {
        this.message.error('Something went wrong', { nzDuration: 3000 });
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;
    this.existingImage = null;
  }
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
