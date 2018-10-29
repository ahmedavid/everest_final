import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoadingController, NavController } from 'ionic-angular';

@Component({
  selector: 'wage-center',
  templateUrl: 'wage-center.html'
})
export class WageCenterComponent implements OnInit{

  selectYearContainer: any;
  statistics:any;
  statTitle: string;
  table:any;

  constructor(
    private data: DataService,
    private loading: LoadingController,
    private navCtrl: NavController
  ) {}

  ngOnInit(){
    this.loadData();
  }

  loadData(year = ''){
    const loading = this.loading.create({spinner:'dots'});
    loading.present();
    this.data.getData('/employee/index',year)
      .then(data => {
        this.statTitle = data[0].title;
        this.selectYearContainer = data[0].content;
        this.statistics = data[2].content;
        this.table = data[1].content;
        this.table.title = data[1].title;
        loading.dismiss();
      })
      .catch(error => {
        console.log(error);
        loading.dismiss();
      });
  }

  onDateChange(ev){
    this.loadData(ev)
  }

  onUrl(url:string){
    this.navCtrl.push('WorkerProfilePage',{url});
  }

}