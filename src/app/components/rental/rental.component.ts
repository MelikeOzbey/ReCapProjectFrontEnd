import { Component, OnInit } from '@angular/core';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { RentalService } from 'src/app/services/rental.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RentalModel } from 'src/app/models/rentalModel';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarDetailDto } from 'src/app/models/CarDetailDto';
import { ActivatedRoute } from '@angular/router';

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
  dailyPrice: number;
  rentalModel: RentalModel = new RentalModel();
  constructor(private rentalService: RentalService, private datePipe: DatePipe, private toastrService: ToastrService,
    private carDetailService: CarDetailService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRentalDetailByUserId(2);
    this.activatedRoute.params.subscribe(params => {
      this.getCarDetail(params["carId"]);
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
  // dateApply() {
  //   this.date = new Date();
  //   this.rentDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  //   this.returnDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');

  // }
  onRentDateChangeEvent(event: any) {
    this.rentDate = event.target.value;
  }
  onReturnDateChangeEvent(event: any) {
    this.returnDate = event.target.value;
    this.totalDayCalculate();
  }

  totalDayCalculate() {
    if (this.rentDate != null && this.returnDate != null && this.rentDate != this.returnDate) {
      var firstDate = new Date(this.rentDate);
      var lastDate = new Date(this.returnDate);
      var dailyPrice = Number((<HTMLInputElement>document.getElementById("dailyPrice")).value);
      var difference_InTime = lastDate.getTime() - firstDate.getTime();
      this.totalDays = difference_InTime / (1000 * 3600 * 24);
      (<HTMLInputElement>document.getElementById("totalDays")).value = this.totalDays.toString();
      (<HTMLInputElement>document.getElementById("total")).value = (this.totalDays * dailyPrice).toString();

    } else {
      this.toastrService.error("Aracı min. 1 günlüğüne kiralayabilirsiniz. Lütfen seçmiş olduğunuz tarih aralığınızı kontrol ediniz.")
    }
  }
  rentSave() {
    debugger
    this.rentalModel.carId = Number((<HTMLInputElement>document.getElementById("carId")).value);
    this.rentalModel.rentDate = new Date(this.rentDate);
    this.rentalModel.returnDate = new Date(this.returnDate);
    this.rentalModel.inTotalDays = this.totalDays;
    this.rentalModel.flTotalPrice = Number((<HTMLInputElement>document.getElementById("total")).value);
    this.rentalModel.customerId=2;
    this.rentalModel.userId=2;
    this.rentalModel.boPaid=false;

    this.rentalService.addRent(this.rentalModel).subscribe(response => {
      this.toastrService.info(response.message);
      this.getRentalDetailByUserId(2);
    }, (error) => {
      this.toastrService.error("Araç kiralanırken hata oluştu", "Dikkat");
    })

  }


}
