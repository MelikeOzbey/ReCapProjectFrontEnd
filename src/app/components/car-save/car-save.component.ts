import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-save',
  templateUrl: './car-save.component.html',
  styleUrls: ['./car-save.component.css']
})
export class CarSaveComponent implements OnInit {
  carInfoForm: FormGroup;
  brands: Brand[] = [];
  colors: Color[] = [];
  selectedFile: File;
  activatedRoute: any;
  constructor(private carService: CarService, private brandService: BrandService, private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private router: Router,
    private carImageService:CarImageService) { }

  ngOnInit(): void {
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
      BrandId: ["", Validators.required],
      ColorId: ["", Validators.required],
      CarName: ["", Validators.required],
      ModelYear: ["", Validators.required],
      DailyPrice: ["", Validators.required],
      Description: ["", Validators.required],
      findexNo: ["", Validators.required]
    })
  }

  SaveCarInfo() {
    debugger
    if (this.carInfoForm.valid) {
      let carModel: Car = Object.assign({}, this.carInfoForm.value)
      this.carService.createCar(carModel).subscribe(response => {
        this.toastrService.info(response.message, "Başarılı");
        this.router.navigateByUrl("setting/carlist");
      }, responseError => {
        this.toastrService.error("Kayıt sırasında hata oluştu", "Dikkat")
      })
    }
  }

  onFileSelected(event) {
    debugger
    this.selectedFile = <File>event.target.files[0];
    this.activatedRoute.params.subscribe(params => {

      if (params["carId"]) {
        this.carImageService.addImage(params["carId"],this.selectedFile);
      }
    })
    
  }
}
