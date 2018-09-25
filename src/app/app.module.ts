import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { TableModule} from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpServiceProvider } from '../providers/http-service';
import { UtilServiceProvider } from '../providers/util-service';
import { StorageServiceProvider } from '../providers/storage-service';
import { AuthServiceProvider } from '../providers/auth-service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/private/home/home';
import { ListPage } from '../pages/private/list/list';
import { GridPage } from '../pages/private/grid/grid';
import { LoginPage } from '../pages/public/login/login';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    GridPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TableModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
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
    StorageServiceProvider,
    AuthServiceProvider
  ]
})
export class AppModule {}
