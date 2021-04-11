import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { RentalModel } from '../models/rentalModel';
import { SingleRespnseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44316/api";
  constructor(private httpClient:HttpClient) { }

  checkIfCarAvailable(carId:number,date:string):Observable<SingleRespnseModel<Rental>>{
    debugger
    let newPath=this.apiUrl+"/rentals/checkcaravailable?id="+carId+"&date="+date;
    return this.httpClient.get<SingleRespnseModel<Rental>>(newPath);
  }
  getCarRentDetailByUserId(userId:number):Observable<ListResponseModel<RentalDetailDto>>{
    debugger
    let newPath=this.apiUrl+"/rentals/getrentaldetailsbyuserid?userId="+userId;
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
  }

  addRent(rentalModel:RentalModel)
  {
    debugger
    let newPath=this.apiUrl+"/rentals/add";
    return this.httpClient.post<SingleRespnseModel<RentalModel>>(newPath,rentalModel);
  }

  getCarRentalDetailList():Observable<ListResponseModel<RentalDetailDto>>{
   return this.httpClient.get<ListResponseModel<RentalDetailDto>>(this.apiUrl+"/rentals/getrentaldetails");
  }
}
