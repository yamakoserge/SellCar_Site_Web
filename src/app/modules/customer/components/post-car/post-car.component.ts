import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StoragesService } from '../../../../auth/auth-components/services/storages/storages.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent {

  
  
  listOfMarque =["BMW", "AUDI", "FERRARI","TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN","HYUNDAI","LEXUS", "KIA", "SUZIKI", "MUTSHIBUZI","AUTRE..."];
  listOfType = ["Gasoline","Diesel"];
  listOfColor =["Red","White","Blue", "Black","Orange","Yellow","Grey", "Silver", "Autre..."];
  listOfTransmission = ["Manuel","Automatic"];
  postCarForm: FormGroup;
  isSpinning : boolean = false;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(private service: CustomerService,
  private fb: FormBuilder,
  private router: Router,
  private message: NzMessageService
  ){}

  ngOnInit(){
    this.postCarForm= this.fb.group({
      marque: [null, [Validators.required]],
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
    this.isSpinning =true;
    console.log(this.postCarForm.value);
    console.log(this.selectedFile);

    const formData: FormData = new FormData();
    formData.append("img", this.selectedFile);
    formData.append("marque", this.postCarForm.get('marque').value);
    formData.append("name", this.postCarForm.get('name').value);
    formData.append("type", this.postCarForm.get('type').value);
    formData.append("color", this.postCarForm.get('color').value);
    formData.append("model", this.postCarForm.get('year').value);
    formData.append("transmission", this.postCarForm.get('transmission').value);
    formData.append("description", this.postCarForm.get('description').value);
    formData.append("price", this.postCarForm.get('price').value);
    formData.append("userId", StoragesService.getUserId());

    this.service.postCar(formData).subscribe(res=>{
      this.isSpinning=false;
      this.message.success("Car posted successfully", {nzDuration:5000});
      this.router.navigateByUrl("/customer/dashboard");
    }, error =>{
      this.message.error("Something went wrong", {nzDuration:5000})
    })
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files [0];
    this.previewImage();
  }
  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }


}
