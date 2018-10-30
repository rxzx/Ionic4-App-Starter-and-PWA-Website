import { StorageKey } from './../shared/enums/storagekey';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageServiceProvider {

  constructor(

  ) {

  }


  get(key: StorageKey) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  set(key:StorageKey, value) {
    return window.localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key:StorageKey) {
    window.localStorage.removeItem(key);
    return true;
  }

  removeAll() {
    window.localStorage.clear();
    return true;
  }
}
