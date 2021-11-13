import { Component } from '@angular/core';
import { Nav,IonicPage, NavController, NavParams , LoadingController , ToastController ,AlertController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';
import { ServicesProvider } from '../../providers/services/services';
import { TabsPage } from '../tabs/tabs';
import { WillPage } from '../will/will';


/**
 * Generated class for the WillsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wills',
  templateUrl: 'wills.html',
})
export class WillsPage {
  wills:any;
  constructor(public nav: NavController,
    private services: ServicesProvider,
    private loadingController:LoadingController,
    public toastCtrl: ToastController,
    public storage: Storage,) {
    this.other_wasya();
  }

  ionViewDidLoad() {
    this.other_wasya();
    console.log('ionViewDidLoad WillsPage');
  }

  other_wasya(){
    let loader = this.loadingController.create({
      content:"",
      duration: 10000
    });
    loader.present().then(() =>{
      this.services.other_wasya().subscribe((data: any) => {
        this.wills =data.data;
        console.log(this.wills)
        loader.dismiss();
      });
    });
  }

  WillPage(will){
    this.nav.push(WillPage,{will: will});
  }
  goToAccount() {
    this.nav.push( SettingsPage );
  }



}
