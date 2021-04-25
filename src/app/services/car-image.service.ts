import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleRespnseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  constructor(private httpClient: HttpClient) { }
  apiUrl = "https://localhost:44316/api/CarImages/";

  addImage(carId: number, file: File) {
    debugger
    const fd: any = new FormData();
    fd.append('Image', file);
    fd.append('carId', carId.toString());
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<SingleRespnseModel<CarImage>>(newPath, fd)
  }

  getImage(carId: number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + "getall?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }
}
