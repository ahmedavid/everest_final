import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { DataService } from '../services/data.service';
import { Company, MenuItem } from '../models/interfaces';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  company: Company;
  rootPage:any = 'DashboardPage';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private data: DataService,
    private menu: MenuController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //statusBar.backgroundColorByHexString('#F2F2F2');
      splashScreen.hide();

      this.data.companyObservable$.subscribe(c => {
        this.company = c
        console.log(this.company)
      });
      this.menu.enable(false);
    });
  }

  onSelectMenuItem(item: MenuItem){
    this.data.selectedMenuItemObserver$.next(item.url);
  }

}

