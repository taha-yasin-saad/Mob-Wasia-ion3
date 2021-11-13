import {Component} from "@angular/core";
import {NavController, AlertController, ToastController,LoadingController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { TabsPage } from '../tabs/tabs';
import { ServicesProvider } from '../../providers/services/services';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {LoginPage} from "../login/login";

/**
 * Generated class for the ActivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-active',
  templateUrl: 'active.html',
})
export class ActivePage {
	isLogin: boolean = false;
	loginForm:any = 0;
	user:any = {};
  constructor(public nav: NavController,
   public forgotCtrl: AlertController, 
   public menu: MenuController, 
   public storage: Storage,
   private loadingController:LoadingController,
   private services: ServicesProvider,
   public toastCtrl: ToastController) {
    this.menu.swipeEnable(false);
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    this.nav.setRoot(LoginPage);
  }

  onSubmitActive(form: NgForm){
    let loader = this.loadingController.create({
      content:"",
      duration: 10000
    });

    let data ={
      phone: form.value.phone,
      active_code: form.value.active_code,
    }
    loader.present().then(() =>{
      this.services.verify(data).subscribe((login: any) => {
        console.log(login);
        if(login.code == 0){
          this.nav.setRoot(LoginPage);
        }else{
          let toast = this.toastCtrl.create({
            message: login.msg,
            duration: 3000
          });
          toast.present();
          
        }
        loader.dismiss();
      })
    });
  }

}
