import {Component} from "@angular/core";
import {Nav,IonicPage, NavController, NavParams , LoadingController , ToastController ,AlertController} from "ionic-angular";
import {LoginPage} from "../login/login";
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';
import { ServicesProvider } from '../../providers/services/services';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  data: any;
  name :any;
  email :any;
  phone :any;
  address: any;
  user_id:any;
  image:any;
  image_url:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: Storage,
              private loadingController:LoadingController,
              private services: ServicesProvider,
              public toastCtrl: ToastController,
              public nav: Nav,
              private alertCtrl: AlertController) {

    this.storage.get('user_info').then(value => {
      if(value){
          console.log(value); 
          this.user_id = value.id;
          this.data = value;
          console.log(this.data);
          this.name = this.data.name;
          this.email = this.data.email;
          this.phone = this.data.phone;
          this.address = this.data.address;
      }
    });

  }
  onSubmitedit(form: NgForm){
    let data ={
      user_id: this.user_id,
      name: form.value.name,
      email: form.value.email,
      address: form.value.address,
      phone: form.value.phone,
      password: form.value.password
    }
    let loader = this.loadingController.create({
        content:"من فضلك انتظر قليلا",
    });
    console.log(data);
    loader.present().then(() =>{
      this.services.edit_data(data).subscribe((profile: any) => {
        loader.dismiss();
        this.services.loged(profile.data);
        let toast = this.toastCtrl.create({
            message: 'تم التعديل بنجاح',
            duration: 3000
          });
          toast.present();
      });
      this.nav.setRoot(TabsPage);
    });
  }
  // logout
  logout(){
    this.services.logout();
    window.location.reload();
  }
  
  goToAccount(){
    this.nav.push( SettingsPage );
  }
}
