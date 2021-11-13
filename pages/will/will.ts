import { Component, ViewChild } from '@angular/core';
import {  Nav,IonicPage, NavController, NavParams , LoadingController , ToastController ,AlertController } from 'ionic-angular';
import {SettingsPage} from "../settings/settings";
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';
import { ServicesProvider } from '../../providers/services/services';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular/platform/platform';
/**
 * Generated class for the WillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const MEDIA_FILES_KEY = 'mediaFiles';

@IonicPage()
@Component({
  selector: 'page-will',
  templateUrl: 'will.html',
})
export class WillPage {
  will:any;

  mediaFiles = [];


  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  selectedTrack: any;

  mediaPlugin: Media = null;

  constructor(public nav: NavController,
    private services: ServicesProvider,
    private loadingController:LoadingController,
    public toastCtrl: ToastController,
    public storage: Storage,
    public navParams: NavParams,
    private mediaCapture: MediaCapture,
    public platform: Platform,
    private file: File,
    private media: Media) {
    this.will = navParams.data.will;
    console.log(this.will);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WillPage');
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      this.mediaFiles = JSON.parse(res) || [];
    })
  }

  captureAudio() {
    if (this.platform.is('ios')) {

      this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.m4a';

      alert(this.file.tempDirectory)

      this.file.createFile(this.file.tempDirectory, this.filePath, true).then(() => {
        let file = this.media.create(this.file.tempDirectory.replace(/^file:\/\//, '') + this.filePath);
        alert(file);
      });

      if (this.file.documentsDirectory !== null || this.file.documentsDirectory !== undefined) {
        alert(this.file.documentsDirectory);
        this.audio = this.media.create(this.filePath);
      }
    } else {
      this.mediaCapture.captureAudio().then(res => {
        this.storeMediaFiles(res);
      }, (err: CaptureError) => console.error(err));
    }

  }

  play(myFile) {
      const audioFile: MediaObject = this.media.create(myFile.localURL);
      audioFile.play();
  }

  storeMediaFiles(files) {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      if (res) {
        let arr = JSON.parse(res);
        arr = arr.concat(files);
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
      } else {
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files));
      }
      this.mediaFiles = this.mediaFiles.concat(files);
    })
  }

  goToAccount() {
    this.nav.push( SettingsPage );
  }

  audioSave(){
    let data ={
      wasya_id : this.will.wasya.id,
      audio : this.mediaFiles
    }
    let loader = this.loadingController.create({
        content:"",
        duration: 10000
    });
    loader.present().then(() =>{
      this.services.audio(data).subscribe((data: any) => {
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
            message: data.msg,
            duration: 3000
          });
          toast.present();
        }
        loader.dismiss();
      })
    });
  }

  died(){

    let loader = this.loadingController.create({
        content:"",
        duration: 10000
    });
    loader.present().then(() =>{
      this.services.died(this.will.wasya.id).subscribe((data: any) => {
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
            message: data.msg,
            duration: 3000
          });
          toast.present();
        }
        loader.dismiss();
      })
    });
  }
}
