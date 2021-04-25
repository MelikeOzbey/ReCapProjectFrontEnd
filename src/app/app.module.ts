import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { HttpClientModule } from "@angular/common/http";
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { NavComponent } from './components/nav/nav.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { NavLoginComponent } from './components/nav-login/nav-login.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FilterCustomerPipe } from './pipes/filter-customer.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RentalListComponent } from './components/rental-list/rental-list.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { SettingComponent } from './components/setting/setting.component';
import { CarSaveComponent } from './components/car-save/car-save.component';




@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    VatAddedPipe,
    FilterPipe,
    NavComponent,
    CarDetailComponent,
    NavLoginComponent,
    LoginComponent,
    RegisterComponent,
    FilterCustomerPipe,
    PaymentComponent,
    ProfileComponent,
    RentalListComponent,
    CarEditComponent,
    CarListComponent,
    SettingComponent,
    CarSaveComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(
      { positionClass:"toast-top-right" }
    ),
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
