import { ShowUserPage } from './../pages/show-user/show-user';
import { AddUserPage } from './../pages/add-user/add-user';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';

import {ActivityService} from "../services/activity-service";
import {TripService} from "../services/trip-service";
import {WeatherProvider} from "../services/weather";

import {MyApp} from "./app.component";

import {SettingsPage} from "../pages/settings/settings";
import {CheckoutTripPage} from "../pages/checkout-trip/checkout-trip";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications";
import {RegisterPage} from "../pages/register/register";
import {SearchLocationPage} from "../pages/search-location/search-location";
import {TripDetailPage} from "../pages/trip-detail/trip-detail";
import {TripsPage} from "../pages/trips/trips";
import { TabsPage } from '../pages/tabs/tabs';
import { MyWillPage } from '../pages/my-will/my-will';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { ActivePage } from '../pages/active/active';
import { AdvicePage } from '../pages/advice/advice';
import { AboutPage } from '../pages/about/about';
import { WitnesesPage } from '../pages/witneses/witneses';
import { WillsPage } from '../pages/wills/wills';
import { EditwillPage } from '../pages/editwill/editwill';
import { WillPage } from '../pages/will/will';

import { ServicesProvider } from '../providers/services/services';

import { MediaCapture } from '@ionic-native/media-capture';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
 
import { IonicStorageModule } from '@ionic/storage';
// import services
// end import services
// end import services

// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    CheckoutTripPage,
    HomePage,
    LoginPage,
    NotificationsPage,
    RegisterPage,
    SearchLocationPage,
    TripDetailPage,
    TripsPage,
    TabsPage,
    MyWillPage,
    ContactUsPage,
    AdvicePage,
    AboutPage,
    WitnesesPage,
    WillsPage,
    EditwillPage,
    WillPage,
    ActivePage,
    AddUserPage,
    ShowUserPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    CheckoutTripPage,
    HomePage,
    LoginPage,
    NotificationsPage,
    RegisterPage,
    SearchLocationPage,
    TripDetailPage,
    TripsPage,
    TabsPage,
    MyWillPage,
    ContactUsPage,
    AdvicePage,
    AboutPage,
    WitnesesPage,
    WillsPage,
    EditwillPage,
    WillPage,
    ActivePage,
    AddUserPage,
    ShowUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    ActivityService,
    TripService,
    WeatherProvider,
    ServicesProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MediaCapture,
    Media,
    File
  ]
})

export class AppModule {
}
