import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailDto } from '../models/CarDetailDto';
import { SingleRespnseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl = "https://localhost:44316/api";
  constructor(private httpClient: HttpClient) { }

  getCarDetailById(carId: number): Observable<SingleRespnseModel<CarDetailDto>>{
    let newPath =this.apiUrl+"/cars/getcardetailbyid?Id="+carId;
    return this.httpClient.get<SingleRespnseModel<CarDetailDto>>(newPath);
  }
}
