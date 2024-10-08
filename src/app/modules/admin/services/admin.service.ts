import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoragesService } from '../../../auth/auth-components/services/storages/storages.service';

const BASE_URL = "http://localhost:8091/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  getAllCars(): Observable<any>{
    return this.http.get(BASE_URL + "api/admin/cars",  {
      headers: this.createAuthorizationHeader()
    })
  }

  getBids(): Observable<any>{
    return this.http.get(BASE_URL + "api/admin/car/bids/",  {
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

  searchCar(searchDto: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/admin/car/search', searchDto, {
      headers: this.createAuthorizationHeader(),
    });
  }
}
