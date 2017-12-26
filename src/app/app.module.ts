import { NgModule } from '@angular/core';
import { MyApp } from './app.component';
//import  { KeysPipe } from '../providers/pipes/pipe';
import { IonicApp, IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



/*----------------PROVIDERS & NATIVES---------------------*/

import { Auth } from '../providers/auth';
import { Config } from '../providers/config';
import { Values } from '../providers/values';
import { Service } from '../providers/service';
import { Facebook } from '@ionic-native/facebook';
import { WpService } from '../providers/wp-service';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Functions } from '../providers/functions/functions';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Push } from '@ionic-native/push';
import { PayPal } from '@ionic-native/paypal';
import { Stripe } from '@ionic-native/stripe';
import { NativeStorage } from '@ionic-native/native-storage';
//import { Crop } from '@ionic-native/crop';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}




@NgModule({
  declarations: [
    MyApp,
   // KeysPipe,


  ],


  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }
  })
  ],


  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],

  providers: [
    Auth,
    Config,
    NativeStorage,
    Values,
    Service,
    Facebook,
    StatusBar,
    WpService,
    Functions,
    GooglePlus,
    SplashScreen,
    SocialSharing,
    TwitterConnect,
    Push,
    PayPal,
    Stripe 
  ]

})
export class AppModule {}
