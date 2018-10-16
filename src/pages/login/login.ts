import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
    private _fb: FormBuilder,
    private authService: AuthService,
    private loading: LoadingController,
    public toastCtrl: ToastController
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

  async login() {
    const loading = this.loading.create({
      spinner:'dots'
    });
    loading.present();
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    try {
      const isAuthenticated = await this.authService.login(email,password);
      if(isAuthenticated.success) {
        const company = await this.authService.getCurrentCopmany();
        if(company != null){
          this.navCtrl.setRoot('DashboardPage');
        }
        else{
          this.navCtrl.setRoot('CompanySelectionPage');
        }
        loading.dismiss();
      }
      else{
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: isAuthenticated.message,
          duration: 3000,
          cssClass: 'dark-trans',
        });
        toast.present();
      }
    } catch (e) {
      console.log(e)
      loading.dismiss();
        let toast = this.toastCtrl.create({
          message: "Service Not Available",
          duration: 3000,
          cssClass: 'dark-trans',
        });
        toast.present();
    }
    this.navCtrl.setRoot('CompanySelectionPage');
  }

}
