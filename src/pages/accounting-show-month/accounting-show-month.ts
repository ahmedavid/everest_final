import { Component } from '@angular/core';
import { IonicPage, NavParams, LoadingController } from 'ionic-angular';
import { DataService } from '../../services/data.service';

@IonicPage()
@Component({
  selector: 'page-accounting-show-month',
  templateUrl: 'accounting-show-month.html',
})
export class AccountingShowMonthPage {

  title = '';
  infos:any[];
  invoiceArr: any[];


  constructor(
    private loading: LoadingController,
    private data:DataService,
    private navParams: NavParams
  ) {}

  async ionViewDidLoad() {
    const url:string = this.navParams.get('url');
    this.title = url.substr(url.length-7,url.length);
    const loading = this.loading.create({spinner:'dots'});
    loading.present();
    this.data.getMonth(url)
      .then(
        data =>{
          this.infos = data.filter( d => d.type === 'help-text');
          this.invoiceArr = data.filter( d=> d.type === 'table');
          loading.dismiss();
        }
      )
      .catch( error => {
        console.error(error)
        loading.dismiss();
      });
  }

}
