import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map } from 'rxjs/operators/map';
import {catchError} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Companies, Company, MenuItem } from '../models/interfaces';
import { AuthService } from './auth.service';

@Injectable()
export class DataService {
  private baseUrl = 'https://portal.everest.hu/app.php';

  public companyObservable$: Observable<Company>;
  public companyObserver$: Observer<Company>;
  //Observable Setup For Switching Components When Menu Items Clicked
  public selectedMenuItemObservable$: Observable<string>;
  public selectedMenuItemObserver$: Observer<string>;
  //end
  public menuItems$: Observable<MenuItem[]>;

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ){
    console.log('WTF IS GOIN ON')
    this.Init();
  }

  async Init(){
    this.companyObservable$ = Observable.create( observer => {
      this.companyObserver$ = observer;
    });
    this.selectedMenuItemObservable$ = Observable.create( observer => {
      this.selectedMenuItemObserver$ = observer;
    });

    const token = await this.auth.getToken();
    if(token)
      this.getMenu();
  }

  async getCompanyList(): Promise<Observable<Companies>> {
    return this.http.get<{companies:Companies}>(this.baseUrl + '/company/select').pipe(
        map( c => {
          console.log("COMPANIES:",c);
          return c.companies;
        }),
        catchError((err, caught) => {
          console.log("OBSERVABLE ERROR:",err,caught);
          return of();
        })
    );
  }

  async getMenu(){
    console.log("GETTING MENU")
    const token = await this.auth.getToken();
    this.menuItems$ = this.http.get<MenuItem[]>(this.baseUrl + '/page/main-menu');
  }

  async getDashboard(dateFrom: string = ''){
    if(dateFrom === ''){
      const company = await this.auth.getCurrentCopmany();
      dateFrom = '/dashboard/index/selected_company_id/' + company.id;
    }
    return this.http.get<any>(this.baseUrl + dateFrom).toPromise();
  }
}
