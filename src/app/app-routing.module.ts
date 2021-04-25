import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarSaveComponent } from './components/car-save/car-save.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalListComponent } from './components/rental-list/rental-list.component';
import { RentalComponent } from './components/rental/rental.component';
import { SettingComponent } from './components/setting/setting.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: "", pathMatch: "full", component: CarComponent },
  { path: "cars", component: CarComponent },
  { path: "cars/car/:carName", component: CarComponent },
  { path: "cars/car/detail/:carId", component: CarDetailComponent },
  { path: "customers", component: CustomerComponent },
  { path: "cars/car/detail/:carId/rent", component: RentalComponent ,canActivate:[LoginGuard] },
  { path: "login", component: LoginComponent},
  { path: "login/register", component: RegisterComponent },
  { path: "cars/car/detail/:carId/rent/payment", component: PaymentComponent },
  { path: "profile", component: ProfileComponent },
  { path: "rentalList", component: RentalListComponent },
  { path: "setting/carlist/caredit/:carId", component: CarEditComponent },
  { path: "setting/carlist", component: CarListComponent },
  { path: "setting", component: SettingComponent },
  { path: "setting/carlist/carsave", component: CarSaveComponent },
  { path: "rent", component: RentalComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
