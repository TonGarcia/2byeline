import { Component } from '@angular/core';
import { Platform, AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Values } from '../providers/values';
import { TranslateService } from '@ngx-translate/core';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  tab1Root = 'ShopPage';
  tab2Root = 'Cart';
  tab3Root = 'LoginPage';
  tab4Root = 'AdminPage';  // Delete This line for customer App
  tab5Root = 'BlogCategoryPage';

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public push: Push, public alertCtrl: AlertController, public values: Values, public translateService: TranslateService) {

    // Copy your firebase credencial here
       firebase.initializeApp({
       apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: ""
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushsetup();

    });

      this.translateService.setDefaultLang('english');

      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.values.isLoggedIn = true;
          this.values.userRole = firebase.database().ref('/Customer-Role').child(user.uid).on('value', snapshot =>{
            if(snapshot.val()){
                this.values.userRole = snapshot.val().role;
            }
          
          });
          
        }
      });
  }
 
  pushsetup() {
    const options: PushOptions = {
     android: {
         senderID: '456352511209'
     },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
     },
     windows: {}
  };
 
  const pushObject: PushObject = this.push.init(options);
 
  pushObject.on('notification').subscribe((notification: any) => {
    if (notification.additionalData.foreground) {
      let youralert = this.alertCtrl.create({
        title: 'New Push notification',
        message: notification.message
      });
      youralert.present();
    }
  });
 
  pushObject.on('registration').subscribe((registration: any) => {
     //do whatever you want with the registration ID
     
  });
 
  pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
}
}
