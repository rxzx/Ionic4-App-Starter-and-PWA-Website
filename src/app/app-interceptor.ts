import { LoaderServiceProvider } from './../providers/loader-service';
import { ApiStatuses } from './../shared/enums/index';
import { UtilServiceProvider } from './../providers/util-service';
import { StorageServiceProvider } from './../providers/storage-service';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageKey, ErrorMessages } from '../shared';
import { AlertController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { map, catchError, finalize } from 'rxjs/operators';

/*
  Generated class for the InterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppInterceptorProvider {
  public apiStatuses: any = ApiStatuses;
  public statusMessages: any;
  constructor(
    public http: HttpClient,
    public storage: StorageServiceProvider,
    public util: UtilServiceProvider,
    public loader: LoaderServiceProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.statusMessages = {
      Error404: "Api not found",
      Error401: "You are not authorized",
      Error500: "Error occur on server",
      Error502: "Server has stopped",
      ApiFailled: 'Some thing went wrong',
    };
    console.log('Hello InterceptorProvider Provider');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.storage.get(StorageKey.AccessToken);

    if (token) {
      this.loader.show();
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          Accept: `application/json`,
          'Content-Type': `application/json`,
          Authorization: `Bearer ${token}`
        }
      });
      request = clone;
    }

    return next.handle(request)
      .do((event: HttpEvent<any>) => { }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          // do error handling here
          if (err.status === 404) {
            this.toast(this.statusMessages.Error404);
          } else if (err.status === 401) {
            this.toast(this.statusMessages.Error404);
          } else if (err.status === 500) {
            this.toast(this.statusMessages.Error500);
          } else if (err.status === 502) {
            this.toast(this.statusMessages.Error502);
          } else {
            this.toast(this.statusMessages.ApiFailled);
          }

        }
        this.loader.hide();
      });


    // .pipe(
    //   map((event: any) => {

    //     debugger;
    //     return event;
    //   }),
    //   catchError(error => {
    //     debugger;
    //     return Observable.throw(error);
    //   }),
    //   finalize(() => {
    //     debugger;
    //     // this.status.setHttpStatus(false);
    //   })
    // );


    // return next.handle(request) ;
  }


  toast(msg: string) {
    return this.toastCtrl.create({ message: msg, duration: 3000, position: 'bottom' }).present();
  }

}
