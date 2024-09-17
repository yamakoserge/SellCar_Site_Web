import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoragesService } from '../../../auth/auth-components/services/storages/storages.service';

const BASE_URL = "http://localhost:8090/"
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  postCar(formData: any): Observable<any>{
    return this.http.post(BASE_URL + "api/customer/car", formData, {
      headers: this.createAuthorizationHeader()
    })
  }

  createAuthorizationHeader(): HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization', 
      'Bearer ' + StoragesService.getToken()
    )
  }
}
