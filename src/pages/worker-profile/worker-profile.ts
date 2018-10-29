import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../services/data.service';

@IonicPage()
@Component({
  selector: 'page-worker-profile',
  templateUrl: 'worker-profile.html',
})
export class WorkerProfilePage {

  invoiceArr: any[] = [];
  stats:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private data: DataService
  ) {}

  ionViewDidLoad() {
    let src = this.navParams.get('url');
    const url = src.replace('/app.php','');
    this.data.getData(url).then( data => {
      console.log("User Profile Data: ",data);
      const arr = data.filter( d=> d.type === 'table');
      this.stats = data.filter( d => d.type === 'list-icon')[0];
      const profile = arr[0];
      const thead = [];
      const tbody = [];
      profile.content.tbody.forEach( d => {
        thead.push(d[0]);
        tbody.push(d[1]);
      });
      const final  = {
        title:profile.title,
        content: {
          thead:[],
          tbody:[]
        }
      };

      final.content.thead = thead;
      final.content.tbody.push(tbody);

      console.log("FINAL: ",final);

      this.invoiceArr.push(final);
      this.invoiceArr.push(arr[1]);

    });
  }

}