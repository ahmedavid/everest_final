import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AuthResponse, Company } from '../models/interfaces';

@Injectable()
export class AuthService {

  private access_token;
  public isOnline = false;

  constructor(private http: HttpClient, private storage: Storage ) {}

  login(email: string, password: string): Promise<any> {
    const baseUrl = 'https://portal.everest.hu/app.php/token/login?username='+email+'&password='+password+'&client_id=fION2P2Kig&client_secret=yzpQL9yosl&grant_type=password&language=en&device_id=123456789';
    return new Promise<any>( (resolve, reject) => {
      this.http.post<AuthResponse>(baseUrl,{}).subscribe(
        response => {
          console.log("AUTH RESPONSE: ",response)
          if (response['error']) {
            resolve({success:false,message:response['error_description']});
          }
          if (response['access_token']) {
            this.storage.set('access_token',response['access_token']);
            this.access_token = response['access_token'];
            resolve({success:true,message:"login success"});
          }
        },
        error => reject(error)
      )
    });
  }

  async getCurrentCopmany(): Promise<Company> {
    return await this.storage.get('current_company');
  }

  setCurrentCompany(company: Company){
    this.storage.set('current_company',company);
  }

  async getToken(): Promise<string>{
    if(!this.access_token){
      this.access_token = await this.storage.get('access_token');
    }
    return this.access_token;
  }

  logout(): Promise<any> {
    this.storage.set('access_token',null);
    this.storage.set('current_company',null);
    return;
  }
}
