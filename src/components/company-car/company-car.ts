import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Content, ContentContainer } from '../../models/interfaces';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'company-car',
  templateUrl: 'company-car.html'
})
export class CompanyCarComponent implements OnInit{

  quickStats: ContentContainer;
  carList: ContentContainer;

  constructor(
    private data: DataService,
    private loading: LoadingController
  ){}

  ngOnInit(){
    const loading = this.loading.create({spinner:'dots'});
    loading.present();
    this.data.getData('/car/index')
      .then( carData => {
        carData.forEach(data => {
          if(data.type == 'list-box'){
            this.quickStats = data;
          }
          if(data.type == 'table'){
            this.carList = data;
          }
        })
        loading.dismiss();
      })
      .catch( error => {
        console.log(error)
        loading.dismiss();
      });
  }
}