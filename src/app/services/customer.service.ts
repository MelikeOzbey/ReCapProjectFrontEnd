import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDetailDto } from '../models/customerDetailDto';
import { CustomerModel } from '../models/customerModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleRespnseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44316/api/";
  constructor(private httpClient: HttpClient) { }

  getCustomerDetailList(): Observable<ListResponseModel<CustomerDetailDto>> {
    return this.httpClient.get<ListResponseModel<CustomerDetailDto>>(this.apiUrl + "customers/getcustomersdetaillist");
  }

  getCustomerByUserId(userId: number) {
    return this.httpClient.get<SingleRespnseModel<Customer>>(this.apiUrl + "customers/getbyuserid?userId=" + userId);
  }

  addCustomer(customer:CustomerModel){
    debugger
    return this.httpClient.post<SingleRespnseModel<CustomerModel>>(this.apiUrl+"customers/add",customer);
  }

  updateCustomer(customer:CustomerModel){
    return this.httpClient.post<SingleRespnseModel<CustomerModel>>(this.apiUrl+"customers/update",customer);
  }


}
