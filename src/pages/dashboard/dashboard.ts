import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ToastController, PopoverController, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { Company } from '../../models/interfaces';
import { DataService } from '../../services/data.service';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage implements OnInit{
  company: Company;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private toastCtrl: ToastController,
    private pop: PopoverController,
    private menuCtrl: MenuController,
    private data: DataService
  ) {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  ngOnInit(){
    this.Init();
  }

  async Init(){
    try {
      const token = await this.auth.getToken();
      if(token == null) {
        this.navCtrl.setRoot("LoginPage");
        return;
      }

      const company = await this.auth.getCurrentCopmany();
      if(company == null){
        this.navCtrl.setRoot("CompanySelectionPage");
      }
      else{
        this.company = company;
        this.data.getMenu();
        console.log("COMPANY:",this.company)
      }
    } catch (error) {
      console.log(error);
      let toast = this.toastCtrl.create({
        message: error,
        duration: 3000,
        cssClass: 'dark-trans',
      });
      toast.present();
    }
  }

  onOpenUserMenu(ev: Event){
    const pop = this.pop.create('PopoverPage');
    pop.present({ev});
    pop.onDidDismiss(data => {
      if(data && data.action === "logout") {
        this.logout();
      }
      if(data && data.action === "navigate") {
        this.navCtrl.push(data.target);
      }
    });
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot('LoginPage');
  }

}
