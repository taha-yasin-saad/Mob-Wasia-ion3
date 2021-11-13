import { ShowUserPage } from './../show-user/show-user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { EditwillPage } from '../editwill/editwill';

/**
 * Generated class for the MyWillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-will',
  templateUrl: 'my-will.html',
})
export class MyWillPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyWillPage');
  }

  goToAccount() {
    this.navCtrl.push( SettingsPage );
  }

  goWitneses(){
    this.navCtrl.push( ShowUserPage );
  }

  editwill(){
    this.navCtrl.push( EditwillPage );
  }

}
