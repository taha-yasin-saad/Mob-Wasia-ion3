import { SettingsPage } from './../settings/settings';
import { AddUserPage } from './../add-user/add-user';
import { MyWillPage } from './../my-will/my-will';
import { TabsPage } from './../tabs/tabs';
import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from 'ionic-angular';
import {
  ServicesProvider
} from '../../providers/services/services';
import {
  Storage
} from '@ionic/storage';

/**
 * Generated class for the ShowUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-user',
  templateUrl: 'show-user.html',
})
export class ShowUserPage {
  witness = <any>[];
  inheritor: any[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingController: LoadingController,
    private services: ServicesProvider,
    public toastCtrl: ToastController,
    public storage: Storage) {
      this.wasya_users();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowUserPage');
  }
  ionViewWillEnter(){
   this.wasya_users();
  }

  wasya_users(){
    let loader = this.loadingController.create({
        content:"",
        duration: 10000
    });
    loader.present().then(() =>{
      this.services.wasya_users().subscribe((data: any) => {

          if(data.witness.length > 0){
            this.witness = data.witness;
            console.log(this.witness);
          }
          if(data.inheritor.length > 0){
            this.inheritor = data.inheritor;
            console.log(this.inheritor);
          }

        loader.dismiss();
      })
    });
  }

  delete_user(data) {
    let loader = this.loadingController.create({
      content: "",
      duration: 10000
    });
    loader.present().then(() => {

      this.services.delete_wasya_users(data).subscribe((res: any) => {
        console.log(res)
        let toast = this.toastCtrl.create({
          message: "تم الحذف بنجاح",
          duration: 3000
        });
        toast.present();
        this.navCtrl.push( MyWillPage );
        loader.dismiss();
      }, (err) => {
        console.log(err);
        console.log("didn't work");
      });

    });
  }

  go_adduser(){
    this.navCtrl.push(AddUserPage);
  }

  goToAccount() {
    this.navCtrl.push( SettingsPage );
  }

}
