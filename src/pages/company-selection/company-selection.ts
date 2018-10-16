import { Component, OnInit } from '@angular/core';
import { IonicPage, MenuController, LoadingController, NavController, PopoverController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';

import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Companies, Company } from '../../models/interfaces';


@IonicPage()
@Component({
  selector: 'page-company-selection',
  templateUrl: 'company-selection.html',
})
export class CompanySelectionPage implements OnInit{
  companyList$: Observable<Companies>;

  constructor(
    private data: DataService,
    private auth: AuthService,
    private menu: MenuController,
    private loading: LoadingController,
    private sanitizer: DomSanitizer,
    private navCtrl: NavController,
    private pop: PopoverController,
  ) {}

  ngOnInit(){
    this.menu.enable(false);
    this.data.getCompanyList().then( obs$ => {
      this.companyList$ = obs$;
    });
  }

  getBackgroundImage(company: Company) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(https://portal.everest.hu${company.cover}) no-repeat`);
  }

  async onSelectCompany(company: Company) {
    //await this.data.setCompany(company);
    this.auth.setCurrentCompany(company);
    this.data.companyObserver$.next(company);
    this.data.getMenu();
    this.navCtrl.setRoot('DashboardPage');
  }

  onOpenUserMenu(ev: Event){
    const pop = this.pop.create('PopoverPage',{showCompanySelectionOption:true});
    pop.present({ev});
    pop.onDidDismiss(data => {
      console.log(data)
      if(data && data.action === "logout") {
        this.logout();
      }
    });
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot('LoginPage');
  }

}
