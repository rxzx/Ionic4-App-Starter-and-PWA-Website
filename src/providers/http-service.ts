import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { API_HOST } from '../app/api.module';

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {

  constructor(
    public http: HttpClient,
    @Inject(API_HOST) private _APIHOST: any
  ) {
  }

  getData() {
    return this.http.get(`${this._APIHOST}/assets/data/data.json`);
  }



}
