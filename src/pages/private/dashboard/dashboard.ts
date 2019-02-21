import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataContext } from '../../../shared/store/datacontext.service';
import { User } from '../../../shared';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dataContext:DataContext) {
  }

  ionViewDidLoad() {
    let users:User[] = [
      { id:1, name:'rxzx1'},
      { id:2, name:'rxzx2'},
      { id:3, name:'rxzx3'}
    ]

    users.forEach(item =>{
      this.dataContext.dc_user.update(item);
    });


    console.log('ionViewDidLoad DashboardPage');
  }

}
