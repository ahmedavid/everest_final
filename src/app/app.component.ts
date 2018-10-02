import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Network } from '@ionic-native/network';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private network: Network,
    private toast: ToastController,
    private auth: AuthService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //statusBar.backgroundColorByHexString('#F2F2F2');
      splashScreen.hide();

      this.network.onDisconnect().subscribe(() => {
        this.toast.create({message:'No Connection'}).present();
        this.auth.isOnline = false;
      });
      this.network.onConnect().subscribe(() => {
        this.toast.create({message:'Connected'}).present();
        this.auth.isOnline = true;
      });
    });
  }
}

