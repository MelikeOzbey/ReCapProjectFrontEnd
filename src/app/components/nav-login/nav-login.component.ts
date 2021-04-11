import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-nav-login',
  templateUrl: './nav-login.component.html',
  styleUrls: ['./nav-login.component.css']
})
export class NavLoginComponent implements OnInit {
  userId: number = Number(this.localStorageService.getLocalStorage("user"));
  isAdmin: boolean;
  constructor(private authService: AuthService, private localStorageService: LocalStorageService,
    private userService: UserService) { }

  
  ngOnInit(): void {
  this.isAdminUser();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  signOut() {
    this.localStorageService.removeFromLocalStrorage("token");
    this.localStorageService.removeFromLocalStrorage("user");
  }
  isAdminUser() {

    this.userService.getUserClaims(this.userId).subscribe(response => {
      for (let i = 0; i < response.data.length; i++) {

        if (response.data[i].name.toString() == "admin") {
          this.isAdmin = true;
          
        } else {
          this.isAdmin = false;
        }

      }
    })
  }
}
