import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ConnectionService } from '../services/connection.service';

import { _throw } from 'rxjs/observable/throw';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,private conn: ConnectionService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.conn.isOnline){
      console.log('APP IS NOT ONLINE THROWING ERROR')
      return _throw({
        message: 'Connection Not Available!'
      });
    } else {
      return fromPromise(this.auth.getToken()).pipe(
        switchMap( (access_token,index) => {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${access_token}`
            }
          });
          return next.handle(request);
        })
      );
    }
  }
}
