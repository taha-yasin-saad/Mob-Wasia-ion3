import {Component} from "@angular/core";
import {NavController,LoadingController,
  ToastController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import { TabsPage } from '../tabs/tabs';
import { ServicesProvider } from '../../providers/services/services';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ActivePage } from '../active/active';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(public nav: NavController,
    private loadingController:LoadingController,
              private services: ServicesProvider,    
              public toastCtrl: ToastController,
              public storage: Storage,    ) {
  }

  // register and go to home page
  register() {
    this.nav.setRoot(TabsPage);
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }

  onSubmitRegister(form: NgForm){
    let data ={
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      password: form.value.password
    }

    let loader = this.loadingController.create({
        content:"",
        duration: 10000
    });
    loader.present().then(() =>{
      this.services.register(data).subscribe((resigter: any) => {
        console.log(resigter);
        if(resigter.code == 0){

          let toast = this.toastCtrl.create({
            message: resigter.msg,
            duration: 3000
          });
          toast.present();

          this.nav.setRoot(LoginPage);
        } else {
          let toast = this.toastCtrl.create({
            message: resigter.error,
            duration: 3000
          });
          toast.present();
        }
        loader.dismiss();
      })
    });
  }

}
