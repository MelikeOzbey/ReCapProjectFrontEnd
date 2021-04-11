import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetailDto } from 'src/app/models/customerDetailDto';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  customers: CustomerDetailDto[] = [];
  filterText: string;
  registerForm:FormGroup;
  return: string = '';
  constructor(private customerService: CustomerService,private formBuilder:FormBuilder,private authService:AuthService,
    private toastrService:ToastrService, 
    private router: Router,
    private route: ActivatedRoute,
    private userService:UserService,
    private localStorageService:LocalStorageService) { }
  
   

  ngOnInit(): void {
   this.createRegisterForm();
   this.route.queryParams
   .subscribe(params => this.return = params['return'] || '/cars');
  }

 
  register(){
    if(this.registerForm.valid){
      let registerForm:RegisterModel=Object.assign({},this.registerForm.value)
      this.authService.register(registerForm).subscribe(response=>{
        localStorage.setItem("token",response.data.token);
        this.getUserByEmail(registerForm.Email)
        this.router.navigateByUrl(this.return);
        },responseError=>{
          this.toastrService.error(responseError.error);
       })

    }
  }


  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
    })
  }
  getUserByEmail(email: string) {
    this.userService.getUserByEmail(email).subscribe(response => {
      this.localStorageService.addLocalStorage("user", response.data.id);
    })
  }
}
