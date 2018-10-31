import { LoaderServiceProvider } from './../providers/loader-service';
import { UtilServiceProvider } from './../providers/util-service';
import { StorageServiceProvider } from './../providers/storage-service';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageKey, ErrorMessages, ApiStatuses } from '../shared';
import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';

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
    private loader: LoaderServiceProvider
  ) {
    this.statusMessages = {
      Error404: "Request not found",
      Error401: "Unauthorized Request",
      Error500: "Request have an internal server Error",
      Error502: "Bad Gateway error",
      ApiFailled: 'Some thing went wrong',
    };
    console.log('Hello InterceptorProvider Provider');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.storage.get(StorageKey.AccessToken);
    this.loader.show();

    if (token) {
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
      .do((event: HttpEvent<any>) => {
        // this.loader.hide();
        this.loader.hide();
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          // do error handling here
          if (err.status === 404) {
            this.util.toast(ErrorMessages.Error404);
          } else if (err.status === 401) {
            this.util.toast(ErrorMessages.Error404);
          } else if (err.status === 500) {
            this.util.toast(ErrorMessages.Error500);
          } else if (err.status === 502) {
            this.util.toast(ErrorMessages.Error502);
          } else {
            this.util.toast(ErrorMessages.ApiFailled);
          }
        }
        return this.loader.hide();
      });
  }

}
