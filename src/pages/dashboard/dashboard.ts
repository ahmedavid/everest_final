import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ToastController, PopoverController, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { Company } from '../../models/interfaces';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage implements OnInit{
  company: Company;
  component: string = 'dashboard';
  sub$:Subscription;

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
        this.data.companyObserver$.next(company);
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

    this.sub$ = this.data.selectedMenuItemObservable$.subscribe(
      component => {

        console.log(component)
        switch(component){
          case '/dashboard/index':
            this.component = 'dashboard';
            break;
          case '/report/show':
            this.component = 'report';
            break;
          case '/accounting_invoice/index':
            this.component = 'invoice';
            break;
          case '/employee/index':
            this.component = 'wage-center';
            break;
          case '/car/index':
            this.component = 'company-car';
            break;
          case '/mission/index':
            this.component = 'mission';
            break;
          case '/statistic/accounting_invoice':
            this.component = 'statistics';
            break;
          case '/accounting/closings':
            this.component = 'closings';
            break;
          case '/accounting/overview':
            this.component = 'overview';
            break;
          default:
            this.component = 'dashboard';
            break;
        }
        //this.component = 'invoice';
      }
    );

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

  onUrl(url:string){
    this.navCtrl.push('AccountingShowMonthPage',{url});
  }

  ngOnDestroy(){
    if(this.sub$){
      this.sub$.unsubscribe();
    }
  }


}
