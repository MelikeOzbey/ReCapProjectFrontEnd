import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/CarDetailDto';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { FindexScoreService } from 'src/app/services/findex-score.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car: CarDetailDto;
  date: string;
  result: boolean;
  message: string;
  userId:number;

  imageUrl1: string = "https://auto1-homepage.prod.mp.auto1.cloud/static/optimized/orange-car-hp-right-mercedez.png";
  imageUrl2: string = "https://auto1-homepage.prod.mp.auto1.cloud/static/optimized/blue-car-hp-left-bmw.png";
  imageUrl3: string = "https://imgd.aeplcdn.com/0x0/n/cw/ec/20865/amg-gt-exterior-right-front-three-quarter-60800.jpeg";

  constructor(private carDetailService: CarDetailService, private activatedRoute: ActivatedRoute,
    private rentalService: RentalService, private toastrService: ToastrService,private localStorageService:LocalStorageService,
    private findexService:FindexScoreService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"])
        this.getCarDetailById(params["carId"]);

    })
    this.userId=Number(this.localStorageService.getLocalStorage("user"));
    this.checkIfFindexScoreOk()
  }

  getCarDetailById(carId: number) {
    this.carDetailService.getCarDetailById(carId).subscribe(response => {
      this.car = response.data;
    })
  }
  checkIfFindexScoreOk() {
debugger
    this.activatedRoute.params.subscribe(params => {
      debugger
      if (params["carId"]) {
        this.findexService.checkIfCarFindexOK(params["carId"], this.userId).subscribe(response => {
          debugger
        if(response.success)
        {
          (<HTMLDivElement>document.getElementById("findexOK")).style.display="block";
        }
          
        }, (error) => {
          //this.result = false;
          (<HTMLDivElement>document.getElementById("findexNotOK")).style.display="block";
          (<HTMLButtonElement>document.getElementById("checkRental")).disabled=true;
        });

      }

    })

  }

  checkIfCarIsOk()
  {
    this.activatedRoute.params.subscribe(params => {
      debugger
      if (params["carId"] && this.date != null) {
        this.rentalService.checkIfCarAvailable(params["carId"], this.date).subscribe(response => {
          this.result = response.success, this.message = response.message;
          this.toastrService.success(this.message, "Başarılı");
        }, (error) => {
          this.result = false;
          this.toastrService.error("Araç kiralanmaya uygun değildir.", "Başarısız");
        });

      }

    })
  }
  OnInput(value: string) {
    debugger
    this.date = value;
  }
}
