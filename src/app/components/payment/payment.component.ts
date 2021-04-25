import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { RentalDetailModel } from 'src/app/models/rentalDetailModel';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  userId: number = Number(this.localstarageService.getLocalStorage("user"));
  rentalDetail: RentalDetailDto;
  rentalDetailModel=new RentalDetailModel();
  constructor(private formBuilder: FormBuilder, private paymentService: PaymentService,
    private toastrService: ToastrService, private localstarageService: LocalStorageService, private rentalService: RentalService) { }

  ngOnInit(): void {
    this.createPaymentForm();
    this.setRentalInfo();
    

  }

  change() {
    (document.getElementById('cartDetail') as HTMLElement).style.display = 'block';
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({

      userFirstName: [],
      userLastName: [],
      userEmail: [],
      userAddress: [],
      stCreditType: [],
      cardUserName: [],
      cardNumber: [],
      cardExpMonth: [],
      cardExpYear: [],
      cardCvv: [],
      userId: [],
    })
  }

  savePayment() {
    debugger
    if (this.paymentForm.valid) {
      let paymentModel = Object.assign({}, this.paymentForm.value);
      console.log(paymentModel);
      if ((<HTMLInputElement>document.getElementById("save-info")).checked) {
        this.paymentService.addPayment(paymentModel).subscribe(response => {
          this.toastrService.info("Bilgileriniz kayıt edildi ve başarılı bir şekilde tamamlandı.", "Başarılı");
          this.saveTheCar();
          this.localstarageService.removeFromLocalStrorage("carInfo");
          window.location.href="rent";
        }, responseError => {
          this.toastrService.error("İşlem sırasında hata oluştu.", "Dikkat");
        })
      } else {
        this.toastrService.info("Ödeme başarılı bir şekilde tamamlandı.", "Başarılı");
        this.saveTheCar();
        this.localstarageService.removeFromLocalStrorage("carInfo");
        window.location.href="rent";
      }

    }
  }

  setRentalInfo() {
    this.rentalDetail = JSON.parse(this.localstarageService.getLocalStorage("carInfo"));
  }

  deletePayment() {
    this.localstarageService.removeFromLocalStrorage("carInfo");
   
  }

  saveTheCar() {
    this.rentalDetailModel.carId=this.rentalDetail.carId;
    this.rentalDetailModel.customerId=this.rentalDetail.customerId;
    this.rentalDetailModel.rentDate=this.rentalDetail.rentDate;
    this.rentalDetailModel.returnDate=this.rentalDetail.returnDate;
    this.rentalDetailModel.inTotalDays=this.rentalDetail.inTotalDays;
    this.rentalDetailModel.flTotalPrice=this.rentalDetail.flTotalPrice;
    this.rentalDetailModel.userId=this.rentalDetail.userId;
    this.rentalDetailModel.boPaid = true;
    debugger
    this.rentalService.addRent(this.rentalDetailModel).subscribe(response => {

    })
  }
}
