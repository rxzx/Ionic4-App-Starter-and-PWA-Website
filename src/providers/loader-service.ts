import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoaderServiceProvider {
    public loader: any;

    constructor(
        public loadingCtrl: LoadingController
    ) {



    }
    
    show() {
        this.loader = this.loadingCtrl.create({
            dismissOnPageChange: true,
            spinner: "bubbles",
            content: "Please wait..."
        });
        this.loader.present();
    }

    hide() {
        this.loader.dismiss()
            .catch((ex) => {
                console.log(ex);
            });;
    }


}