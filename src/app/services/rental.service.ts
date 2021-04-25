import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { RentalModel } from '../models/rentalModel';
import { SingleRespnseModel } from '../models/singleResponseModel';
import { RentalDetailModel } from '../models/rentalDetailModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44316/api";
  constructor(private httpClient: HttpClient) { }

  checkIfCarAvailable(carId: number, date: string): Observable<SingleRespnseModel<Rental>> {

    let newPath = this.apiUrl + "/rentals/checkcaravailable?id=" + carId + "&date=" + date;
    return this.httpClient.get<SingleRespnseModel<Rental>>(newPath);
  }
  getCarRentDetailByUserId(userId: number): Observable<ListResponseModel<RentalDetailDto>> {

    let newPath = this.apiUrl + "/rentals/getrentaldetailsbyuserid?userId=" + userId;
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
  }

  addRent(rentalModel: RentalDetailModel) {
debugger
    let newPath = this.apiUrl + "/rentals/add";
    return this.httpClient.post<SingleRespnseModel<RentalModel>>(newPath, rentalModel);
  }

  getCarRentalDetailList(): Observable<ListResponseModel<RentalDetailDto>> {
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(this.apiUrl + "/rentals/getrentaldetails");
  }

  getCarRentDetailByCarId(carId: number): Observable<SingleRespnseModel<RentalDetailDto>> {

    let newPath = this.apiUrl + "/rentals/getrentaldetailsbycarid?carId=" + carId;
    return this.httpClient.get<SingleRespnseModel<RentalDetailDto>>(newPath);
  }
  deleteRent(rental: RentalDetailDto) {
    let newPath = this.apiUrl + "/rentals/delete";
    return this.httpClient.post<SingleRespnseModel<RentalDetailDto>>(newPath, rental);
  }

  update(rental: RentalDetailDto) {
    let newPath = this.apiUrl + "/rentals/update";
    return this.httpClient.post<SingleRespnseModel<RentalDetailDto>>(newPath, rental);
  }

  getPaidRentalDetailsByUserId(userId: number): Observable<ListResponseModel<RentalDetailDto>> {
    let newPath = this.apiUrl + "/rentals/getpaidrentaldetailsbyuserid?userId=" + userId;
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
  }
}
