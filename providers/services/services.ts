import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {HttpHeaders, HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ServicesProvider {

  user_id:any;
  id:any;
  phone:any;
  name:any;
  email:any;
  address:any;


  // service_url:any='http://localhost/wasya/public/api/';
  // image_url:any='http://localhost/wasya/public/upload/';
  service_url:any='http://malexs.com/wasya/public/api/';
  image_url:any='http://malexs.com/wasya/public/upload/';


  splash=true;

  constructor(private _http: HttpClient , public storage: Storage,private events: Events )
  {
    this.check_userid();
  }

  service_path(){
    return this.service_url;
  }

  image_path(){
    return this.image_url;
  }

  check_splash(){
    return this.splash;
  }
  set_splash(){
    this.splash=false;
  }

  login(data){
    let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
    let body =  'phone='+ data.phone+
                '&password='+ data.password;
    return this._http.post(this.service_url+'login', body, options);
  }

  verify(data){
    let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
    let body =  'phone='+ data.phone+
                '&active_code='+ data.active_code;
    return this._http.post(this.service_url+'verify', body, options);
  }

  register(data){
    let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
    let body =  'name='+ data.name+
                '&phone='+ data.phone+
                '&email='+ data.email+
                '&password='+ data.password;
    return this._http.post(this.service_url+'register', body, options);
  }

  logout(){
    this.storage.set('user_info', '');
    this.events.publish('logout:changed');
  }

  isLoged(){
    return this.storage.get('user_info').then(value => value ? true : false)
  }

  loged(data){
    let item = {
      user_id: data.id,
      email: data.email,
      name: data.name,
      phone: data.phone,
      address:data.address
    };
    console.log(item);
    this.storage.set('user_info', item);
    this.events.publish('logout:changed');
  }

  edit_data(data){
    let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
    let body =  'name='+ data.name+
                '&phone='+ data.phone+
                '&email='+ data.email+
                '&address='+ data.address+
                '&password='+ data.password+
                '&user_id='+this.user_id;
    return this._http.post(this.service_url+'update_my_account', body, options);
  }

  check_userid(){
    this.storage.get('user_info').then(value => {
      if(value){
        this.user_id = value.user_id;
        this.name = value.name;
        this.email = value.email;
        this.phone = value.phone;
        this.address = value.address;
      }else{
        this.user_id = false;
      }
    });
  }

  setting(){
    let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
    let body = '';
    return this._http.get(this.service_url+'setting', options);
  }

  contact(data){
    let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
    let body =  'name='+ data.name +
                '&phone='+ data.phone+
                '&message='+ data.message+
                '&email='+ data.email;
    return this._http.post(this.service_url+'contact', body, options);
  }

  wasya(){
    let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        console.log(this.user_id)
    let body = 'user_id='+this.user_id;
    return this._http.post(this.service_url+'wasya', body, options);
  }

  update_wasya(data){
    let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
    let body =  'wasya_text='+ data.wasya_text+
                '&debit='+ data.debit+
                '&prayers='+ data.prayers+
                '&user_id='+data.user_id;
    return this._http.post(this.service_url+'update_wasya', body, options);
  }

  wasya_users(){
    let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        console.log(this.user_id)
    let body = 'user_id='+this.user_id;
    return this._http.post(this.service_url+'wasya_users', body, options);
  }

  delete_wasya_users(data){
    let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        console.log(this.user_id)
    let body = 'user_id='+this.user_id+
               '&id='+ data;
    return this._http.post(this.service_url+'delete_wasya_users', body, options);
  }


  add_wit(data){
    let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        console.log(this.user_id)
    let body = 'user_id='+this.user_id+
               '&witness_name='+ data.witness_name+
               '&witness_phone='+ data.witness_phone;
    return this._http.post(this.service_url+'add_wasya_witness', body, options);
  }

  add_inherit(data){
    let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        console.log(this.user_id)
    let body = 'user_id='+this.user_id+
               '&inheritor_name='+ data.inheritor_name+
               '&inheritor_phone='+ data.inheritor_phone;
    return this._http.post(this.service_url+'add_wasya_inheritor', body, options);
  }

  update_wasya_users(data){
    let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
    let witness_name = '';
    for (let w_name of data.witness_name) {
      witness_name += '&witness_name[]='+w_name;
    }
    let witness_phone = '';
    for (let w_phone of data.witness_phone) {
      witness_phone += '&witness_phone[]='+w_phone;
    }
    let inheritor_name = '';
    for (let i_name of data.inheritor_name) {
      inheritor_name += '&inheritor_name[]='+i_name;
    }
    let inheritor_phone = '';
    for (let i_phone of data.inheritor_phone) {
      inheritor_phone += '&inheritor_phone[]='+i_phone;
    }
    let body =  'wasya_id='+ data.wasya_id+
                witness_name+
                witness_phone+
                inheritor_name+
                inheritor_phone+
                '&user_id='+this.user_id;
    return this._http.post(this.service_url+'update_wasya_users', body, options);
  }

  other_wasya(){
    let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        console.log(this.user_id)
    let body = 'user_id='+this.user_id;
    return this._http.post(this.service_url+'other_wasya', body, options);
  }

  died(wasya_id){
    let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        console.log(this.user_id)
    let body = 'wasya_id='+ wasya_id+
               '&user_id='+this.user_id;
    return this._http.post(this.service_url+'died', body, options);
  }

  audio(data){
    let options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    };
    console.log(this.user_id);
    let body = 'wasya_id='+ data.wasya_id+
               '&audio='+ data.audio+
               '&user_id='+this.user_id;
    return this._http.post(this.service_url+'audio', body, options);
  }

}
