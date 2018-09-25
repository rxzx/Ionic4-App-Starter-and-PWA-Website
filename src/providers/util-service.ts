import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';

@Injectable()
export class UtilServiceProvider {
  public loader: any;

  constructor(
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  showToast(msg: string) {
    return this.toastCtrl.create({ message: msg, duration: 3000, position: 'top' }).present();
  }

  showLoader() {
    return this.loader.present();
  }

  hideLoader() {
    return this.loader.dismissAll();
  }

  confirm(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
