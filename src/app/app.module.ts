import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {TableModule} from 'primeng/table';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GridPage } from '../pages/grid/grid';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { UtilServiceProvider } from '../providers/util-service/util-service';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    GridPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    GridPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServiceProvider,
    UtilServiceProvider,
    StorageServiceProvider
  ]
})
export class AppModule {}
