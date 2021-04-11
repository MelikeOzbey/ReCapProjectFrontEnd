import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentInfo } from '../models/paymentInfo';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "https://localhost:44316/api";
  constructor(private httpClient: HttpClient) { }

  addPayment(payment: PaymentInfo) {
    debugger
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/paymentinfos/add", payment);
  }
}
