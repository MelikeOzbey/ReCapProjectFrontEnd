import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarTestModel } from 'src/app/models/cartestModel';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {

  carInfoForm: FormGroup;
  brands: Brand[] = [];
  colors: Color[] = [];
  car: Car;


  constructor(private carService: CarService, private brandService: BrandService, private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {

      if (params["carId"]) {
        this.setValueofCarForm(params["carId"]);
      }
    })
    this.createCarForm();
    this.getBrands();
    this.getColors();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  createCarForm() {
    this.carInfoForm = this.formBuilder.group({
      id:["", Validators.required],
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      carName: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
      findexNo: []
    })
  }

  UpdateCarInfo() {

    if (this.carInfoForm.valid) {
      let carModel: Car = Object.assign({}, this.carInfoForm.value)
      this.carService.updateCar(carModel).subscribe(response => {
        this.toastrService.info(response.message, "Başarılı");
        this.router.navigateByUrl("setting/carlist");
      }, responseError => {
        this.toastrService.error("Güncelleme işlemi sırasında hata oluştu", "Dikkat")
      })
    }
  }

  setValueofCarForm(carId: number) {

    this.carService.getCurrentCar(carId).subscribe(response => {

      this.carInfoForm.setValue({
        id:response.data.id,
        brandId: response.data.brandId,
        colorId: response.data.colorId,
        carName: response.data.carName,
        modelYear: response.data.modelYear,
        dailyPrice: response.data.dailyPrice,
        description: response.data.description,
        findexNo: response.data.findexNo,
      })

    })
  }
  deleteCar(){
    if (this.carInfoForm.valid) {
      let carModel: Car = Object.assign({}, this.carInfoForm.value)
      this.carService.deleteCar(carModel).subscribe(response => {
        this.toastrService.info(response.message, "Başarılı");
        this.router.navigateByUrl("setting/carlist");
      }, responseError => {
        this.toastrService.error("Silme işlemi sırasında hata oluştu", "Dikkat")
      })
    }
  }
}
