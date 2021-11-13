import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {SettingsPage} from "../settings/settings";
import { ServicesProvider } from '../../providers/services/services';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {

  phone: any;
  email: any;
  name: any;
  message: any;

  constructor(public nav: NavController,
   public navParams: NavParams,
   private loadingController:LoadingController,
   private services: ServicesProvider,    
   public toastCtrl: ToastController,
   public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
  }
  goToAccount() {
    this.nav.push( SettingsPage );
  }
  onContact(form: NgForm){
    let data ={
      name: form.value.name,
      email: form.value.email,
      message: form.value.message,
      phone: form.value.phone
    }
    let loader = this.loadingController.create({
        content:"",
        duration: 10000
    });
    loader.present().then(() =>{
      this.services.contact(data).subscribe((contact: any) => {
        console.log(contact);
        if(contact.code == 0){

          let toast = this.toastCtrl.create({
            message: contact.msg,
            duration: 3000
          });
          toast.present();  
          form.resetForm();   
        }else {
          let toast = this.toastCtrl.create({
            message: contact.error,
            duration: 3000
          });
          toast.present();
        }
        loader.dismiss();
      })
    });
  }

}
