import { ShowUserPage } from './../show-user/show-user';
import { SettingsPage } from './../settings/settings';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AddUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html',
})
export class AddUserPage {
  witness_name: any;
  witness_phone: any;
  inheritor_name: any;
  inheritor_phone: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private loadingController:LoadingController,
     private services: ServicesProvider,
     public toastCtrl: ToastController,
     public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUserPage');
  }




  goToAccount() {
    this.navCtrl.push( SettingsPage );
  }

  add_wit() {
    let data = {
      witness_name :  this.witness_name,
      witness_phone :  this.witness_phone,
    }
    let loader = this.loadingController.create({
      content:"",
      duration: 10000
    });
    loader.present().then(() =>{

      this.services.add_wit(data).subscribe((res: any) => {
        console.log(res);
        if(res.code == 0){
          let toast = this.toastCtrl.create({
            message: "تم الاضافة بنجاح",
            duration: 3000
          });
          toast.present();
          this.navCtrl.push(ShowUserPage);
        } else {
          let toast = this.toastCtrl.create({
            message: "تأكد من صحة البيانات",
            duration: 3000
          });
          toast.present();
        }
        loader.dismiss();
      }, (err) => {
        console.log(err);
        console.log("didn't work");
      });

    });
  }

  add_inherit() {
    let data = {
      inheritor_name :  this.inheritor_name,
      inheritor_phone :  this.inheritor_phone,
    }
    let loader = this.loadingController.create({
      content:"",
      duration: 10000
    });
    loader.present().then(() =>{

      this.services.add_inherit(data).subscribe((res: any) => {
        console.log(res);
        if(res.code == 0){
          let toast = this.toastCtrl.create({
            message: "تم الاضافة بنجاح",
            duration: 3000
          });
          toast.present();
          this.navCtrl.push(ShowUserPage);
        } else {
          let toast = this.toastCtrl.create({
            message: "تأكد من صحة البيانات",
            duration: 3000
          });
          toast.present();
        }
        loader.dismiss();
      }, (err) => {
        console.log(err);
        console.log("didn't work");
      });

    });
  }

}
