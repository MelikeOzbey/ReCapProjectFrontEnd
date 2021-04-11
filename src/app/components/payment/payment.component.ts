import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private paymentService: PaymentService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createPaymentForm();
  }

  change() {
    (document.getElementById('cartDetail') as HTMLElement).style.display = 'block';
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
     
      userFirstName: [],
      userLastName:[],
      userEmail: [],
      userAddress: [],
      boSaveInfo: [],
      boCreditType: [],
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
      if(paymentModel.boSaveInfo==true){
        this.paymentService.addPayment(paymentModel).subscribe(response => {
          this.toastrService.info("Bilgileriniz kayıt edildi ve başarılı bir şekilde tamamlandı.", "Başarılı");
        },responseError=>{
          this.toastrService.error("İşlem sırasında hata oluştu.", "Dikkat");
        })
      }else{
        this.toastrService.info("Ödeme başarılı bir şekilde tamamlandı.", "Başarılı");
      }
     
   }
  }
}
