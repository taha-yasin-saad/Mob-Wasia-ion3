import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { TabsPage } from '../pages/tabs/tabs';

import { ServicesProvider } from '../providers/services/services';
import { Storage } from '@ionic/storage';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  is_Login: boolean = false;
  name:any;

  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    private services: ServicesProvider,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home'}
    ];
  }

  initializeApp() {
    this.services.isLoged().then(value => {
      if(value){
        this.is_Login = true;
        this.set_user_data();
        this.rootPage=TabsPage;
      }else{
        this.is_Login = false;
        this.rootPage=LoginPage;
        
      }
    })
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);

      

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  set_user_data(){
    this.storage.get('user_info').then(value => {
      if(value){  
        this.name = value.name;
        console.log(this.name);
      }
    });
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }

}
