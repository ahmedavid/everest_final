import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  form: FormGroup;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this._fb.group({
      email: ['', Validators.compose([
        Validators.required,Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,Validators.minLength(6)
      ])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.navCtrl.setRoot('CompanySelectionPage');
  }

}
