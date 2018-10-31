import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { TableModule } from 'primeng/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpServiceProvider } from '../providers/http-service';
import { UtilServiceProvider } from '../providers/util-service';
import { StorageServiceProvider } from '../providers/storage-service';
import { AuthServiceProvider } from '../providers/auth-service';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/public/login/login';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiModule } from './api.module';
import { DashboardPage } from '../pages/private/dashboard/dashboard';
import { ListPage } from '../pages/private/list/list';
import { LoaderServiceProvider } from '../providers/loader-service';
import { AppInterceptorProvider } from '../providers/app-interceptor';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TableModule,
    HttpClientModule,
    ReactiveFormsModule,
    // ApiModule.forRoot('https://test.com/'),//mobile 
    ApiModule.forRoot('/'), //web 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptorProvider, multi: true },
    HttpServiceProvider,
    UtilServiceProvider,
    StorageServiceProvider,
    AuthServiceProvider,
    LoaderServiceProvider
  ]
})
export class AppModule { }
