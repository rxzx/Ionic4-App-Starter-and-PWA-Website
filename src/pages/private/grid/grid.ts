import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service';
import { AuthServiceProvider } from '../../../providers/auth-service';

/**
 * Generated class for the GridPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-grid',
  templateUrl: 'grid.html',
})
export class GridPage {
  public data: any[];
  public cols: any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpServiceProvider,
    public authService: AuthServiceProvider
  ) {
    this.data = [];
  }

  ionViewDidLoad() {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'province', header: 'Province' },
      { field: 'province', header: 'Province' },
    ];

    this.http.getData().subscribe((response: any) => {
      // console.log(response);
      this.data = response.city;
    });


  }

  ionViewCanEnter() {
    return this.authService.authenticated();
  }

}
