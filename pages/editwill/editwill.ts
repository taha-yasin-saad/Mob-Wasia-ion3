import { Component } from '@angular/core';
import { Nav,IonicPage, NavController, NavParams , LoadingController , ToastController ,AlertController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';
import { ServicesProvider } from '../../providers/services/services';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the EditwillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editwill',
  templateUrl: 'editwill.html',
})
export class EditwillPage {
  wasya_text:any;
  debit:any;
  prayers:any;
  user_id:any;
  step = 1;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              private loadingController:LoadingController,
              private services: ServicesProvider,
              public nav: Nav,
              public toastCtrl: ToastController,) {

    this.storage.get('user_info').then(value => {
      if(value){
          console.log(value);
          this.user_id = value.user_id;
      }
    });
    this.wasya();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditwillPage');
    this.storage.get('user_info').then(value => {
      if(value){
          console.log(value);
          this.user_id = value.user_id;
      }
    });
    this.wasya();
  }

  wasya(){
    this.services.wasya().subscribe((data: any) => {
      console.log(data);
      if (data.code == 0) {
        this.wasya_text = data.data.wasya_text;
        this.debit = data.data.debit;
        this.prayers = data.data.prayers;
      }
    });
  }

  update_wasya(){
    let data ={
      wasya_text: this.wasya_text,
      debit: this.debit,
      prayers: this.prayers,
      user_id: this.user_id
    }
    let loader = this.loadingController.create({
        content:"من فضلك انتظر قليلا",
    });
    console.log(data);
    loader.present().then(() =>{
      this.services.update_wasya(data).subscribe((data: any) => {
        console.log(data);
        loader.dismiss();
        if (data.code == 0) {
          let toast = this.toastCtrl.create({
            message: 'تم التعديل بنجاح',
            duration: 3000
          });
          toast.present();
           // window.location.reload();
           this.navCtrl.pop();
        } else {
          let toast = this.toastCtrl.create({
            message: data.error,
            duration: 3000
          });
        }

      });
      // this.nav.setRoot(TabsPage);
    });
  }

  goToAccount() {
    this.navCtrl.push( SettingsPage );
  }

  goStep1(){
    this.step = 1;
  }
  goStep2(){
    this.step = 2;
  }

  goStep3(){
    this.step = 3;
  }

}
