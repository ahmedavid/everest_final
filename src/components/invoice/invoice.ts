import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'invoice',
  templateUrl: 'invoice.html'
})
export class InvoiceComponent implements OnInit{
  infos:any[];
  invoiceArr: any[];

  @Output('url') url = new EventEmitter<string>();

  constructor(
    private data:DataService,
    private loading:LoadingController
  ) {}

  ngOnInit(){
    const loading = this.loading.create({spinner:'dots'});
    loading.present();
    this.data.getData('/accounting_invoice/index')
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

  onUrl(url:string){
    this.url.emit(url);
  }
}
