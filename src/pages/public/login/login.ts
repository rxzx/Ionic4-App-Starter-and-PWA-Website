import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilServiceProvider } from '../../../providers/util-service';
import { DashboardPage } from '../../private/dashboard/dashboard';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public util: UtilServiceProvider
  ) {
    this.loginForm = this.formBuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    if(this.loginForm.valid){
      this.util.showLoader();
      console.log(this.loginForm.value);
      setTimeout( () =>{
        this.navCtrl.setRoot(DashboardPage);
        this.util.hideLoader();
      },500);
    }else{
      this.util.showToast("Invalid Login");
    }
  }

}
