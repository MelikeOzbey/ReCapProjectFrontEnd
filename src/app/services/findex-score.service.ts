import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class FindexScoreService {

  apiUrl = "https://localhost:44316/api";
  constructor(private httpClient: HttpClient) { }

  checkIfCarFindexOK(carId: number, userId: number): Observable<ResponseModel> {
    debugger
    let newPath = this.apiUrl + "/rentals/checkcarfindexavailable?carId=" + carId + "&userId=" + userId;
    return this.httpClient.get<ResponseModel>(newPath);
  }
}
