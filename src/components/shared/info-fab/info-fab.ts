import { Component, Input } from '@angular/core';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'info-fab',
  templateUrl: 'info-fab.html'
})
export class InfoFabComponent {
  @Input('infos') infos:any[];
  constructor(private alertCtrl:AlertController) {}

  showAlert(info){
    console.log("INFO:",info)
    const configObject:any = {title:'Figyelem'}
    if(info.content.type == 'info'){
      configObject.message = info.content.content;
    }

    if(info.content.type == 'warning'){
      configObject.message = info.content.content;
    }

    const alert = this.alertCtrl.create(configObject);
    alert.present();
  }
}
