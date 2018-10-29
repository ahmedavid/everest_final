import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoadingController } from 'ionic-angular';
import { ContentContainer } from '../../models/interfaces';

@Component({
  selector: 'statistics',
  templateUrl: 'statistics.html'
})
export class StatisticsComponent implements OnInit{
  select:any;
  help:any;
  charts = [];
  merged = [];
  icons = [];

  partners:ContentContainer;
  customers:ContentContainer;
  constructor(private data:DataService,private loading:LoadingController) {}

  ngOnInit(){
    this.loadData();
  }

  loadData(year = ''){
    const loading = this.loading.create({spinner:'dots'});
    loading.present();
    this.data.getData('/statistic/accounting_invoice',year)
      .then( data => {
        console.log("STATISTICS DATA:",data);
        this.select = data.filter( d => d.type === 'select-with-onchange-handler').map( d => d.content)[0];
        this.help = data.filter( d => d.type === 'help-text');
        //this.charts = data.filter( d => d.type === 'chart-line' || d.type === 'chart-pie');
        this.charts = data.filter( d => d.type === 'chart-line');
        let income = data.filter( d => d.title === 'Bevételek')[0];
        let expense = data.filter( d => d.title === 'Kiadások')[0];
        this.customers = data.filter( d => d.title === 'Vásárlók')[0];
        this.partners = data.filter( d => d.title === 'Partnerek')[0];

        this.merged = [];
        for(let i =0;i<income.content[0]['x-axis'].length;i++){
          this.merged.push({
            month:income.content[0]['x-axis'][i]['value'],
            income:{
              title: income.title,
              value:income.content[0]['values'][i][1],
              color:income.content[0]['color'],
            },
            expense:{
              title: expense.title,
              value:expense.content[0]['values'][i][1],
              color:expense.content[0]['color'],
            },
          });
        }

        this.icons = data.filter( d => d.type === 'list-icon');
        loading.dismiss();
      })
      .catch( error => {
        console.log(error);
        loading.dismiss();
      });
  }

  yearChanged(year:string){
    this.loadData(year);
  }
}
