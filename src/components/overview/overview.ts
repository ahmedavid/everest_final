import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'overview',
  templateUrl: 'overview.html'
})
export class OverviewComponent implements OnInit{

  infos:any[];

  selectYearContainer:any;
  statTitle:string;
  statContent:any;

  resultTitle:string;
  resultContent:any;

  tableTitle:string;
  thead:any;
  tbody:any;

  chartTitle:string;
  chartData = [];
  chartLabels = [];
  chartColors= [{backgroundColor:[]}];

  loaded =false;

  constructor(private data: DataService,private loading:LoadingController) {}

  ngOnInit(){
    const loading = this.loading.create({spinner:'dots'});
    loading.present();
    this.data.getData('/accounting/overview')
      .then( data =>{

        console.log(data)
        this.selectYearContainer = data[0].content;

        this.infos = data.filter( d => d.type == 'help-text');

        this.statTitle = data[2].title;
        this.statContent = data[2].content;

        this.resultTitle = data[3].title;
        this.resultContent = data[3].content;

        this.tableTitle = data[4].title;
        this.thead = data[4].content.thead;
        this.tbody = data[4].content.tbody;


        //debugger;
        this.chartTitle = data[5].title;
        const d:any = data[5];
        d.content.forEach(element => {
          this.chartData.push(element.percent)
          this.chartLabels.push(element.title)
          this.chartColors[0]['backgroundColor'].push(element.color)
        });

        loading.dismiss().then( ()=>this.loaded = true);

      })
      .catch( error => {
        loading.dismiss();
        console.log(error);
      });
  }

}
