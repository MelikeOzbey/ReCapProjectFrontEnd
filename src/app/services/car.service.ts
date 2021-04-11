import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetailDto } from '../models/CarDetailDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleRespnseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44316/api";
  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "/cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "/cars/getcardetailsbybrandId?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }
  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "/cars/getcardetailsbycolorId?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);

  }
  getCarsByBrandAndColor(brandId: number, colorId: number): Observable<ListResponseModel<CarDetailDto>> {

    let newPath = this.apiUrl + "/cars/getcardetailsbybrandIdandcolorId?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);

  }

  createCar(carModel: Car): Observable<ResponseModel> {
    debugger
    let newPath = this.apiUrl + "/cars/add";
    return this.httpClient.post<ResponseModel>(newPath, carModel);
  }

  updateCar(carModel: Car): Observable<ResponseModel> {
    debugger
    let newPath = this.apiUrl + "/cars/update";
    return this.httpClient.post<ResponseModel>(newPath, carModel);
  }
  deleteCar(carModel: Car): Observable<ResponseModel> {
    debugger
    let newPath = this.apiUrl + "/cars/delete";
    return this.httpClient.post<ResponseModel>(newPath, carModel);
  }

  getCurrentCar(carId: number): Observable<SingleRespnseModel<Car>> {
    return this.httpClient.get<SingleRespnseModel<Car>>(this.apiUrl + "/cars/getbyid?id=" + carId);
  }
}
