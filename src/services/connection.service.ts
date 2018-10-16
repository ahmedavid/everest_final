import { Injectable } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Injectable()
export class ConnectionService {
  public isOnline = true;
  private isNativeApp = false;
  constructor(platform: Platform,private network: Network,private toast: ToastController){
    if(platform.is('core') || platform.is('mobileweb')){
      this.isNativeApp = false;
    }
    else{
      this.isNativeApp = true;
    }
    platform.ready().then(() => {
      if(this.isNativeApp){
        this.network.onDisconnect().subscribe(() => {
          this.isOnline = false;
          this.toast.create({message:'No Connection',duration:3000}).present();
        });
        this.network.onConnect().subscribe(() => {
          this.isOnline = true;
          this.toast.create({message:'Connected',duration:3000}).present();
        });
      } else {
        console.log('Assumed Always Online');
      }
    });
  }
}
