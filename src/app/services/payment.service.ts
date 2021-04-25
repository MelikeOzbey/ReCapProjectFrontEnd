import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentInfo } from '../models/paymentInfo';
import { ResponseModel } from '../models/responseModel';
import { SingleRespnseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "https://localhost:44316/api";
  constructor(private httpClient: HttpClient) { }

  addPayment(payment: PaymentInfo) {
    debugger
    let newPath=this.apiUrl + "/PaymentInfos/add";
    return this.httpClient.post<SingleRespnseModel<PaymentInfo>>(newPath, payment);
  }
}
