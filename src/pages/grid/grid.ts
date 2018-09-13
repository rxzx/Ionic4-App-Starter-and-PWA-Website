import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GridPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grid',
  templateUrl: 'grid.html',
})
export class GridPage {
  cars: any[];
  cols: any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
    ];

    this.cars = [
      {
       'vin':'123',
       'year':'123',
       'brand':'123',
       'color':'color', 
      },
      {
        'vin':'123',
        'year':'123',
        'brand':'123',
        'color':'color', 
       },
    ];
    console.log('ionViewDidLoad GridPage');
  }

}
