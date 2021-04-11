import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  return: string = '';
  user:User
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private localStorageService: LocalStorageService) { }


  ngOnInit(): void {
    this.createLoginForm();
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/cars');
  }


  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]

    })

  }
  login() {
    if (this.loginForm.valid) {
      let loginModel: LoginModel = Object.assign({}, this.loginForm.value)
      console.log(loginModel);
      this.authService.login(loginModel).subscribe(response => {
        localStorage.setItem("token", response.data.token);
        this.getUserByEmail(loginModel.email)
        this.router.navigateByUrl(this.return);
      }, responseError => {
        this.toastrService.error(responseError.error);
      })
    }
  }

  getUserByEmail(email: string) {
    debugger
    this.userService.getUserByEmail(email).subscribe(response => {
      this.user=response.data;
      this.localStorageService.addLocalStorage("user", this.user.id);
    })
  }
}
