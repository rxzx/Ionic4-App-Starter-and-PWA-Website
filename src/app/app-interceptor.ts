import { StorageServiceProvider } from './../providers/storage-service';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageKey } from '../shared';
import { AlertController } from 'ionic-angular';

import { Observable } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';

/*
  Generated class for the InterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppInterceptorProvider {

  constructor(
    public http: HttpClient,
    public storage: StorageServiceProvider,
    private alertCtrl: AlertController
  ) {
    console.log('Hello InterceptorProvider Provider');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.storage.get(StorageKey.AccessToken);
    if (token) {
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          Accept: `application/json`,
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`
        }
      });
      
      return next.handle(clone);
    }

    // return next.handle(request) ;
  }


  // Adds the token to your headers if it exists
  private addToken(request: HttpRequest<any>, token: any) {
    if (token) {
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          Accept: `application/json`,
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`
        }
      });
      return clone;
    }

    return request;
  }

}
