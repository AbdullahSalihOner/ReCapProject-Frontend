import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car'; 
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  
  cars: Car[] = [];
  dataLoaded=false;
  
  constructor(private carService:CarService,
     private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["categoryId"]) {
        this.getCarsByCategory(params["categoryId"])
      }else{
        this.getCars()
      }
    })
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data
      this.dataLoaded = true;
    })
  
  }

  getCarsByCategory(categoryId:number){
    this.carService.getCarsByCategory(categoryId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded = true;
    })
  
  }
}
