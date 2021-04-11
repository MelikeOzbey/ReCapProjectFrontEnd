import { Component, OnInit } from '@angular/core';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {
  rentalDetails: RentalDetailDto[] = [];
  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.getCarRentalDetails();
  }

  getCarRentalDetails() {
    this.rentalService.getCarRentalDetailList().subscribe(response=>{
      this.rentalDetails=response.data;
    })
  }
}
