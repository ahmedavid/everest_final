import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  isCompanySelectionPage: boolean = false;

  constructor(private viewCtrl: ViewController,private navParams: NavParams){
    this.isCompanySelectionPage = this.navParams.get('showCompanySelectionOption') === true;
  }

  logout() {
    this.viewCtrl.dismiss({action:"logout"});
  }

  navigateTo(page: string){
    this.viewCtrl.dismiss({action:"navigate",target:page});
  }

}
