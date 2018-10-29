import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController, AlertController, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';


@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage implements OnInit{

  file:any;
  imagePriview:any;
  help:any;

  title:string;
  pageTitle:string = '';
  options:{
    name:string;
    title:string;
    type:string;
    values:{text:string,value:number}[]
  };
  selectedOption:number = 1;
  actionUrl:string;

  constructor(
    private navCtr:NavController,
    private auth: AuthService,
    private data:DataService,
    private loading:LoadingController,
    private alert:AlertController,
    private camera: Camera
  ) {}

  ngOnInit(){
    const loading = this.loading.create({spinner:'dots'});
    loading.present();
    this.data.getData('/accounting_invoice/showMonth/')
      .then( data => {
        loading.dismiss();

        this.help = data.filter( d => d.type === 'help-text');
        const form = data.filter( d => d.type === 'form')[0];
        this.title = form.title;
        this.actionUrl = form.content['action-url'];
        this.pageTitle = this.actionUrl.substr(this.actionUrl.length - 8,7);
        this.options = form.content['fields'][1];
      })
      .catch(error =>{
        loading.dismiss();
        console.log(error);
      });
  }

  onFileChanged(ev){
    this.file = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePriview = reader.result;
    };
    try {
      reader.readAsDataURL(this.file);
    } catch (error) {
      console.log(error);
    }
  }

  async onUpload(){
    const company = await this.auth.getCurrentCopmany();
    if(company == null) {
      this.navCtr.setRoot('CompanySelectionPage');
    }
    const formData = new FormData();
    formData.append("image",this.file);
    formData.append("selected_company_id",company.id);
    formData.append("is_income",this.selectedOption.toString());

    const loading = this.loading.create();
    loading.present();

    this.data.uploadInvoice(this.actionUrl,formData)
      .then( response => {
        loading.dismiss();
        this.alert.create({message:"Sikeres feltöltés"}).present();
        this.file= null;
        this.imagePriview = null;
      })
      .catch(error=>{
        loading.dismiss();
        this.alert.create({message:"Sikeretelen feltöltés"}).present();
      });
  }

  onCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     //let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.imagePriview = 'data:image/jpeg;base64,' + imageData;
     this.file = imageData;
    }, (err) => {
     // Handle error
    });
  }

  onChange(value){
  }
}
