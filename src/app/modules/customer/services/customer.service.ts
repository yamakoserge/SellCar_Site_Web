import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoragesService } from '../../../auth/auth-components/services/storages/storages.service';

const BASE_URL = 'http://localhost:8091/';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  postCar(formData: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/customer/car', formData, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCars(): Observable<any> {
    return this.http.get(BASE_URL + 'api/customer/cars', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getMyCars(): Observable<any> {
    return this.http.get(
      BASE_URL + 'api/customer/my-cars/${StoragesService.getUserId()}',
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(BASE_URL + 'api/customer/my-cars/${id}', {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCarById(id: number): Observable<any> {
    return this.http.get(BASE_URL + 'api/customer/car/${id}', {
      headers: this.createAuthorizationHeader(),
    });
  }
  updateCar(id: number, carDto: any): Observable<any> {
    return this.http.put(BASE_URL + 'api/customer/car/${id}', carDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StoragesService.getToken()
    );
  }
}
