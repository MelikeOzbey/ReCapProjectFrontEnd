import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/CarDetailDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: CarDetailDto[] = [];
  colors: Color[] = [];
  brands: Brand[] = [];
  currentCar: CarDetailDto;
  filterText = '';
  colorId: number;
  brandId: number;
  constructor(private carService: CarService, private activatedRoute: ActivatedRoute, private colorService: ColorService, 
    private brandService: BrandService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"])
        this.GetCarsByBrandId(params["brandId"]);
      else if (params["colorId"])
        this.getCarsByColorId(params["colorId"])
      else
        this.getCars();

    })
    this.getColors();
    this.getBrands();

  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
    })
  }

  setCurrentModel(car: CarDetailDto) {
    this.currentCar = car;
  }

  GetCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars = response.data;
    })
  }

  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.cars = response.data;
    })
  }

  getCurrentBrandClass(car: CarDetailDto) {
    if (car == this.currentCar)
      return "list-group-item active"
    else
      return "list-group-item"

  }
  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }
  orderbycolor(value: number) {

    // this.carService.getCarsByColor(value).subscribe(response => {
    //   this.cars = response.data;
    // })
    this.colorId = value;

  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
      console.log(this.brandId);
    })
  }

  orderbybrand(value: number) {

    // this.carService.getCarsByBrand(value).subscribe(response => {
    //   this.cars = response.data;
    // })
    this.brandId = value;

  }

  filterCars() {
    if(this.brandId && this.colorId)
    {
      this.carService.getCarsByBrandAndColor(this.brandId, this.colorId).subscribe(response => {
        this.cars = response.data;
      })
    }else{
      this.toastrService.error("Filtrelemeden önce marka veya renk seçtiğinizden emin olun!","Dikkat");
    }
   
  }

  clean()
  {
   window.location.reload();
  }
}
