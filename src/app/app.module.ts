import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Network } from '@ionic-native/network';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { ConnectionService } from '../services/connection.service';
import { TokenInterceptor } from '../interceptors/token.interceptor';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    ConnectionService,
    AuthService,
    DataService,
    Network,
    StatusBar,
    SplashScreen,
    //{provide: ErrorHandler, useClass: IonicErrorHandler,multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor,multi:true},
  ]
})
export class AppModule {}
