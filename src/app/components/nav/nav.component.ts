import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userId: number = Number(this.localStorageService.getLocalStorage("user"));
  isAdmin: boolean;

  constructor(private userService: UserService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.isAdminUser();
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
