import {Component} from "@angular/core";
import {NavController, AlertController, ToastController,LoadingController, MenuController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import { TabsPage } from '../tabs/tabs';
import { ServicesProvider } from '../../providers/services/services';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ActivePage } from '../active/active';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
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
    this.nav.setRoot(TabsPage);
  }

  active() {
    this.nav.setRoot(ActivePage);
  }

  onSubmitLogin(form: NgForm){
    let loader = this.loadingController.create({
      content:"",
      duration: 10000
    });

    let data ={
      phone: form.value.phone,
      password: form.value.password,
    }
    loader.present().then(() =>{
      this.services.login(data).subscribe((login: any) => {
        console.log(login);
        if(login.code == 0){
          this.services.loged(login.data);
          if (this.storage.get('user_info') !== null) {
            this.services.check_userid();
          }
          this.services.isLoged().then((value: any) => {
            if(value){
              // this.events.publish('logout:changed');
              // loader.dismiss();
            }else{
              return false;
            }
          })
          this.nav.setRoot(TabsPage);
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

  IsLogin(){
    this.services.isLoged().then((value: any) => {
      if(value){
        this.isLogin = true;
      }else{
        this.isLogin = false;
      }
    })
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
