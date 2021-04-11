import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerModel } from 'src/app/models/customerModel';
import { UpdateUserModel } from 'src/app/models/updateUserModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { CustomerComponent } from '../customer/customer.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup
  updateUserModel: UpdateUserModel
  user: User
  customer: CustomerModel = new CustomerModel();
  individualCompanyName = "Bireysel";
  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute, private localStorageService: LocalStorageService, private authService: AuthService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    let userId = Number(this.localStorageService.getLocalStorage("user"));
    this.getUser(userId);
    this.createProfileForm();
  }
  createProfileForm() {
    this.profileForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: [],
      userId: [],

    })
  }

  updateProfile() {
    debugger
    if (this.profileForm.valid) {
      let userModel = Object.assign({}, this.profileForm.value);
      this.authService.updateUser(userModel).subscribe(response => {
        this.localStorageService.removeFromLocalStrorage("token");
        this.localStorageService.addLocalStorage("token", response.data.token)
        this.toastrService.info(response.message);


      })

    }
  }

  getUser(id: number) {
    debugger
    this.userService.getUser(id).subscribe(response => {
      this.user = response.data;
      this.profileForm.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: "",
        userId: this.user.id
        
      })
      this.getCustomer();
    }, (responseError) => {
      this.toastrService.error(responseError.error);
    })
  }
  setCompanyType() {
    debugger
    if ((<HTMLInputElement>document.getElementById("corporateCheck")).checked) {
      (<HTMLElement>document.getElementById("divCompany")).style.display = "block";
    } else {
      (<HTMLElement>document.getElementById("divCompany")).style.display = "none";
      (<HTMLInputElement>document.getElementById("companyName")).value="";
    }
  }

  updateCompany() {
    this.customer.userId = Number(this.localStorageService.getLocalStorage("user"));
    if ((<HTMLInputElement>document.getElementById("companyName")).value != "") {
      this.customer.companyName = (<HTMLInputElement>document.getElementById("companyName")).value;
    } else {
      this.customer.companyName = this.individualCompanyName;
    }
    this.customer.id = Number((<HTMLInputElement>document.getElementById("companyId")).value);
    this.customer.boCorporate=(<HTMLInputElement>document.getElementById("corporateCheck")).checked;
    this.customerService.updateCustomer(this.customer).subscribe(response => {
      this.toastrService.info(response.message);
    }, (responseError) => {
      this.customerService.addCustomer(this.customer).subscribe(response=>{
        this.toastrService.info(response.message);
      })
    })

  }
  getCustomer()
  {
    let userId=Number(this.localStorageService.getLocalStorage("user"));
    this.customerService.getCustomerByUserId(userId).subscribe(response=>{
      if(response.data.boCorporate)
      {
        (<HTMLElement>document.getElementById("divCompany")).style.display = "block";
        (<HTMLInputElement>document.getElementById("corporateCheck")).checked=true;
        (<HTMLInputElement>document.getElementById("companyName")).value=response.data.companyName;
      }else{
        (<HTMLElement>document.getElementById("divCompany")).style.display = "none";
        (<HTMLInputElement>document.getElementById("individualCheck")).checked=true;
      }
      (<HTMLInputElement>document.getElementById("companyId")).value=(response.data.id).toString();

    })
  }
}
