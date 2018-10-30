import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/public/login/login';
import { DashboardPage } from '../pages/private/dashboard/dashboard';
import { ListPage } from '../pages/private/list/list';
import { StorageServiceProvider } from '../providers/storage-service';
import { StorageKey } from '../shared';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public rootPage: any = DashboardPage;

  public pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage:StorageServiceProvider
  ) {
    this.storage.set(StorageKey.AccessToken,"xbxncbxncbxncbnxbcxnbncbxcdhjhdh")
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: DashboardPage },
      { title: 'List', component: ListPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
    this.nav.push(LoginPage);
  }
}
