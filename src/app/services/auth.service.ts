import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleRespnseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { UpdateUserModel } from '../models/updateUserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44316/api/auth/";
  constructor(private httpClient: HttpClient) { }

  login(loginModel: LoginModel) {
    return this.httpClient.post<SingleRespnseModel<TokenModel>>(this.apiUrl + "login", loginModel);
  }

  register(registerModel: RegisterModel) {
    return this.httpClient.post<SingleRespnseModel<TokenModel>>(this.apiUrl + "register", registerModel);
  }
  updateUser(updateUserModel: UpdateUserModel) {
    return this.httpClient.post<SingleRespnseModel<TokenModel>>(this.apiUrl + "updateuser", updateUserModel);
  }

  isAuthenticated() {
    if (localStorage.getItem("token"))
      return true;
    else
      return false;
  }

 
}
