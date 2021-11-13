import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams  } from 'ionic-angular';
import {SettingsPage} from "../settings/settings";
import { ServicesProvider } from '../../providers/services/services';
/**
 * Generated class for the AdvicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-advice',
  templateUrl: 'advice.html',
})
export class AdvicePage {
  advice:any;
  constructor(public nav: NavController, public navParams: NavParams,private services: ServicesProvider, private loadingController:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    this.get_about();
  }
  // to go account page
  goToAccount() {
    this.nav.push( SettingsPage );
  }
  get_about(){
    let loader = this.loadingController.create({
      content:"",
      duration: 10000
    });
    loader.present().then(() =>{
      this.services.setting().subscribe((advice: any) => {
        this.advice = advice.setting.advice;
        loader.dismiss();
      });
    });
  }

}
