import { Component, OnInit } from '@angular/core';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { RentalService } from 'src/app/services/rental.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RentalModel } from 'src/app/models/rentalModel';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarDetailDto } from 'src/app/models/CarDetailDto';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CustomerService } from 'src/app/services/customer.service';
declare let alertify: any;


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers: [DatePipe],
})
export class RentalComponent implements OnInit {
  rentals: RentalDetailDto[] = [];
  carDetail: CarDetailDto;
  imageUrl1: string = "https://auto1-homepage.prod.mp.auto1.cloud/static/optimized/orange-car-hp-right-mercedez.png";
  rentDate: string | null;
  returnDate: string | null;
  date: Date;
  totalDays: number;
  total: number;
  rentalModel: RentalModel = new RentalModel();
  rental: RentalDetailDto;
  userId: number = Number(this.localStorageService.getLocalStorage("user"));
  customerId: number;
  rentalNotPaid: RentalDetailDto[] = [];
  constructor(private rentalService: RentalService, private datePipe: DatePipe, private toastrService: ToastrService,
    private carDetailService: CarDetailService, private activatedRoute: ActivatedRoute, private localStorageService: LocalStorageService, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getRentalDetailByUserId(this.userId);
    this.getCustomerInfo(this.userId);
    this.activatedRoute.params.subscribe(params => {
      this.getCarDetail(params["carId"]);
      this.getCarDetailByCarId(params["carId"]);
    });


    //console.log((this.aa.returnDate).toString());
    //(<HTMLInputElement>document.getElementById("rentDate")).value=(this.aa.returnDate).toString();
  }
  getCustomerInfo(userId: number) {
    this.customerService.getCustomerByUserId(userId).subscribe(response => {
      this.customerId = response.data.id;
    })
  }
  getRentalDetailByUserId(userId: number) {
    this.rentalService.getCarRentDetailByUserId(userId).subscribe(response => {
      this.rentals = response.data;
    })
  }

  getCarDetail(id: number) {
    this.carDetailService.getCarDetailById(id).subscribe(response => {
      this.carDetail = response.data;
    })

  }
  getCarDetailByCarId(id: number) {
    this.rentalService.getCarRentDetailByCarId(id).subscribe(response => {
      this.rental = response.data;
    })

  }

  getRentalDetailNotPaid(userId: number) {
    this.rentalService.getPaidRentalDetailsByUserId(userId).subscribe(response => {
      this.rentalNotPaid = response.data;
    })
  }
  // dateApply() {
  //   this.date = new Date();
  //   this.rentDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  //   this.returnDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');

  // }
  onRentDateChangeEvent(event: any) {
    let date = new Date();
    if (this.rental != null) {
      date = new Date(this.rental.returnDate);
      date.setDate(date.getDate() + 1);
    }
    var currenDate = new Date(event.target.value);

    if (date < currenDate) {
      this.rentDate = event.target.value;
    }
    else {
      alert(this.datePipe.transform(date, 'dd-MM-yyyy') + " tarihinden öncesini seçemezsin!");
      (<HTMLInputElement>document.getElementById("rentDate")).value = this.datePipe.transform(date, 'yyyy-MM-dd');
      this.rentDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    }

  }
  onReturnDateChangeEvent(event: any) {

    let dateReturn = new Date(this.rentDate);
    dateReturn.setDate(dateReturn.getDate() + 1);

    let currentDate = new Date(event.target.value);

    if (dateReturn <= currentDate) {
      this.returnDate = event.target.value;
    } else {
      alert(this.datePipe.transform(dateReturn, 'dd-MM-yyyy') + " tarihinden öncesini seçemezsin!");
      (<HTMLInputElement>document.getElementById("returnDate")).value = this.datePipe.transform(dateReturn, 'yyyy-MM-dd');
      this.returnDate = this.datePipe.transform(dateReturn, 'yyyy-MM-dd');
    }
    this.totalDayCalculate();

  }

  totalDayCalculate() {

    if (this.rentDate != null && this.returnDate != null && this.rentDate != this.returnDate) {
      var firstDate = new Date(this.rentDate);
      var lastDate = new Date(this.returnDate);
      var dailyPrice = Number((<HTMLInputElement>document.getElementById("DailyPrice")).value);
      var difference_InTime = lastDate.getTime() - firstDate.getTime();
      this.totalDays = difference_InTime / (1000 * 3600 * 24);
      (<HTMLInputElement>document.getElementById("totalDays")).value = this.totalDays.toString();
      (<HTMLInputElement>document.getElementById("total")).value = (this.totalDays * dailyPrice).toString();

    } else {
      this.toastrService.error("Aracı min. 1 günlüğüne kiralayabilirsiniz.");

    }
  }
  rentSave() {

    this.rentalModel.carId = Number((<HTMLInputElement>document.getElementById("carId")).value);
    this.rentalModel.carName =(<HTMLInputElement>document.getElementById("carName")).value;
    this.rentalModel.rentDate = new Date(this.rentDate);
    this.rentalModel.returnDate = new Date(this.returnDate);
    this.rentalModel.inTotalDays = this.totalDays;
    this.rentalModel.dailyPrice=Number((<HTMLInputElement>document.getElementById("DailyPrice")).value);
    this.rentalModel.flTotalPrice = Number((<HTMLInputElement>document.getElementById("total")).value);
    this.rentalModel.customerId = this.customerId;
    this.rentalModel.userId = this.userId;
    this.rentalModel.boPaid = false;
    this.rentalService.addRent(this.rentalModel).subscribe(response => {
      this.toastrService.info(response.message);
      this.getRentalDetailByUserId(this.userId);
      // this.getRentalDetailNotPaid(this.userId);
     
    }, (error) => {
      this.toastrService.error("Araç kiralanırken hata oluştu", "Dikkat");
    })


  }
  deleteRent(rental: RentalDetailDto) {
debugger
    this.rentalService.deleteRent(rental).subscribe(response => {
      this.toastrService.success(response.message);
      this.getRentalDetailByUserId(this.userId);
    });

    // alertify.confirm('Confirm Title', 'Confirm Message', function () {
    //   this.rentalService.deleteRent(rental).subscribe(response => {
    //     alertify.success(response.message);

    //   });
    // }
    //   , function () { alertify.error('Cancel') });


  }

  addInfo() {
    this.rentalModel.carId = Number((<HTMLInputElement>document.getElementById("carId")).value);
    this.rentalModel.carName =(<HTMLInputElement>document.getElementById("carName")).value;
    this.rentalModel.rentDate = new Date(this.rentDate);
    this.rentalModel.returnDate = new Date(this.returnDate);
    this.rentalModel.inTotalDays = this.totalDays;
    this.rentalModel.dailyPrice=Number((<HTMLInputElement>document.getElementById("DailyPrice")).value);
    this.rentalModel.flTotalPrice = Number((<HTMLInputElement>document.getElementById("total")).value);
    this.rentalModel.customerId = this.customerId;
    this.rentalModel.userId = this.userId;
    this.rentalModel.boPaid = false;
    this.localStorageService.addLocalStorage("carInfo", JSON.stringify(this.rentalModel));
  }
}
