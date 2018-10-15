import { NgModule,InjectionToken } from '@angular/core';
export const API_HOST = new InjectionToken('API_HOST');

@NgModule()
export class ApiModule {
  static forRoot(host: string) {
    return {
      ngModule: ApiModule,
      providers: [{
        provide: API_HOST,
        useValue: host
      }]
    }
  }
}