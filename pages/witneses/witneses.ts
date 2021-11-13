import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { NgForm } from '@angular/forms';
import { ServicesProvider } from '../../providers/services/services';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the WitnesesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-witneses',
  templateUrl: 'witneses.html',
})
export class WitnesesPage {
  wit_div: any;
  wit_length: any;
  witness_name:any = ["",""];
  witness_phone:any = ["",""];
  inheritor_name:any = ["",""];
  inheritor_phone:any = ["",""];
  old: any=0;
  will:any;

  constructor(public nav: NavController,
   public navParams: NavParams,
   private loadingController:LoadingController,
   private services: ServicesProvider,    
   public toastCtrl: ToastController,
   public storage: Storage) {
  }

  ionViewDidEnter() {
    this.wasya_users();
    this.wit_count();
    console.log('ionViewDidLoad WitnesesPage');
  }
  wasya_users(){
    let loader = this.loadingController.create({
        content:"",
        duration: 10000
    });
    loader.present().then(() =>{
      this.services.wasya_users().subscribe((data: any) => {
          
          if(data.witness.length > 0){
            this.old =1;
            // this.witness_name[0] = data.witness[0].name;
            // this.witness_name[1] = data.witness[1].name;

            // this.witness_phone[0] = data.witness[0].phone;
            // this.witness_phone[1] = data.witness[1].phone;

            // this.inheritor_name[0] = data.inheritor[0].name;
            // this.inheritor_name[1] = data.inheritor[1].name;

            // this.inheritor_phone[0] = data.inheritor[0].phone;
            // this.inheritor_phone[1] = data.inheritor[1].phone;
            this.will = data;

          }

        loader.dismiss();
      })
    });
  }
  onUpdate(form: NgForm){
    let data ={
      witness_name: this.witness_name,
      witness_phone: this.witness_phone,
      inheritor_name: this.inheritor_name,
      inheritor_phone: this.inheritor_phone
    }

    let loader = this.loadingController.create({
        content:"",
        duration: 10000
    });
    loader.present().then(() =>{
      this.services.update_wasya_users(data).subscribe((data: any) => {
        console.log(data);
        if(data.code == 0){

          let toast = this.toastCtrl.create({
            message: data.msg,
            duration: 3000
          });
          toast.present();  
          window.location.reload();
        }else {
          let toast = this.toastCtrl.create({
            message: data.error,
            duration: 3000
          });
          toast.present();
        }
        loader.dismiss();
      })
    });
    
  }

  wit_count(){
    this.wit_div = [];
    this.wit_length = 2; // user defined length
    for(var i = 0; i < this.wit_length; i++) {
        this.wit_div.push({witness_name:"",witness_phone:""});
    }
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }
  add_wit() {
     this.wit_div.push(1);
  }

  goToAccount() {
    this.nav.push( SettingsPage );
  }

}
