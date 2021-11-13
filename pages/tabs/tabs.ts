import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { ContactUsPage } from '../contact-us/contact-us';
import { AdvicePage } from '../advice/advice';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root:any = HomePage;
  tab2Root:any = AdvicePage;
  tab3Root:any = AboutPage;
  tab4Root:any = ContactUsPage;
  constructor(public navCtrl: NavController,public navParams: NavParams,platform: Platform,public storage: Storage) {

  }


}
