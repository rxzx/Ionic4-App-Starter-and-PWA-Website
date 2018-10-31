import { ApiResponse } from './../shared/index';
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
      .do((event: HttpEvent<any> | any) => {
        if (event && event.body) {
          let response: ApiResponse = new ApiResponse();
          Object.assign(response, event.body);
          if (response.isSuccess) {

          } else {
            // do error handling here
            this.showApiError(response.statusCode);
          }
        }
        this.loader.hide();
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          // do error handling here
          this.showApiError(err.status);
        }
        return this.loader.hide();
      });
  }

  showApiError(status) {
    if (status === 404) {
      this.util.toast(ErrorMessages.Error404);
    } else if (status === 401) {
      this.util.toast(ErrorMessages.Error404);
    } else if (status === 500) {
      this.util.toast(ErrorMessages.Error500);
    } else if (status === 502) {
      this.util.toast(ErrorMessages.Error502);
    }
  }

}
