import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleRespnseModel } from '../models/singleResponseModel';
import { UpdateUserModel } from '../models/updateUserModel';
import { User } from '../models/user';
import { UserOperationClaimsDto } from '../models/UserOperationClaimsDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "https://localhost:44316/api/users";
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<ListResponseModel<User>> {
    return this.httpClient.get<ListResponseModel<User>>(this.apiUrl + "/getall");
  }


  getUser(id: number): Observable<SingleRespnseModel<User>> {

    return this.httpClient.get<SingleRespnseModel<User>>(this.apiUrl + "/getbyid?id=" + id);
  }

  getUserByEmail(email: string): Observable<SingleRespnseModel<User>> {
    return this.httpClient.get<SingleRespnseModel<User>>(this.apiUrl + "/getbyemail?email=" + email)
  }

  getUserClaims(userId: number): Observable<ListResponseModel<UserOperationClaimsDto>> {

    return this.httpClient.get<ListResponseModel<UserOperationClaimsDto>>(this.apiUrl + "/getuserclaims?userId=" + userId);
  }
}
