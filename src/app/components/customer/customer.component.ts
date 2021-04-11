import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerDetailDto } from 'src/app/models/customerDetailDto';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: CustomerDetailDto[] = [];
  
  constructor(private customerService: CustomerService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.getCustomersDetail();
  }

  getCustomersDetail() {
    this.customerService.getCustomerDetailList().subscribe(response => {
      this.customers = response.data;
    })
  }
  
}
