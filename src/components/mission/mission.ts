import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoadingController } from 'ionic-angular';
import { ContentContainer } from '../../models/interfaces';

@Component({
  selector: 'mission',
  templateUrl: 'mission.html'
})
export class MissionComponent implements OnInit{

  missionArr:ContentContainer[];

  constructor(
    private data: DataService,
    private loading: LoadingController
  ) {}

  ngOnInit(){
    const loading = this.loading.create({spinner:'dots'});
    loading.present();
    this.data.getData('/mission/index')
      .then(data =>{
        console.log(data)
        this.missionArr = data;
        loading.dismiss();
      })
      .catch(error => {
        console.log(error);
        loading.dismiss();
      });
  }

}

