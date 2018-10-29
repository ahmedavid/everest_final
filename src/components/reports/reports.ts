import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoadingController } from 'ionic-angular';
import { ContentContainer } from '../../models/interfaces';

@Component({
  selector: 'reports',
  templateUrl: 'reports.html'
})
export class ReportsComponent implements OnInit {
  reportArr: ContentContainer;
  afaArr:any;
  constructor(
    private data: DataService,
    private loading: LoadingController
  ) {}


  ngOnInit(){
    const loading = this.loading.create({spinner:'dots'});
    loading.present();
    this.data.getData('/report/show')
      .then(
        data =>{

          console.log("REPORT DATA: ", data);
          this.reportArr = data[0];
          loading.dismiss();

          const afa = data[1];
          const thead = [];
          const tbody = [];
          afa.content.tbody.forEach( d => {
            thead.push(d[0]);
            tbody.push(d[1]);
          });
        const final  = {
          title:afa.title,
          content: {
            thead:[],
            tbody:[]
          }
      };

      final.content.thead = thead;
      final.content.tbody.push(tbody);

      this.afaArr = final;
        }
      )
      .catch( error => {
        loading.dismiss();
        console.error(error)
      });
  }
}
