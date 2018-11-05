import { Component, OnInit, Input } from '@angular/core';
import { NavigationItem } from '../../models/interfaces';
import { DataService } from '../../services/data.service';
import { LoadingController, NavController } from 'ionic-angular';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardComponent implements OnInit{
  title: string;
  tbody: any;
  thead: any;
  toggle: boolean = false;

  url='';

  @Input('next') next: NavigationItem;
  @Input('previous') previous: NavigationItem;

  constructor(
    private data: DataService,
    private loading: LoadingController,
    private navCtrl: NavController
  ) {}

  ngOnInit(){
    this.loadData();
  }

  onToggle(row:any){
    row.toggle = !row.toggle;
  }

  onPrevNext(url: string){
    this.url = url;
    this.loadData(url);
  }

  loadData(url:string = ''){
    const loading = this.loading.create({spinner:'dots'});
    loading.present();
    this.data.getDashboard(url)
      .then( data => {
        console.log("DATA:",data)
        this.title = data[1].title;
        this.tbody = data[1].content.tbody;
        this.thead = data[1].content.thead;
        this.previous = data[0].content[0];
        this.next = data[0].content[1];
        loading.dismiss();
      })
      .catch(error => {
        console.log(error);
        loading.dismiss();
      })
  }

  onUpload(){
    this.navCtrl.push('UploadPage');
  }

  async onTogglePaid(params:{isPaid:boolean,index:number}){
    try {
      console.log("PARAMS: ",params);
      const date = this.tbody[params.index][0];
      const type = this.tbody[params.index][1];
      console.log("PPP:", date,type,params);
      await this.data.updatePaid(type,date,params.isPaid);
      this.loadData(this.url);
    } catch (error) {
      console.log(error);
    }
  }

}
