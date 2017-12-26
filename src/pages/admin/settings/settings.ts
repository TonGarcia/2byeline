import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ Service } from '../../../providers/service';
import{ Values } from '../../../providers/values';
import { TranslateService } from '@ngx-translate/core';
import firebase from 'firebase';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

	language: any;
	form: any;
  banners: any;
  selectedFile:any;
  bannerList: any;
  disableSubmit: boolean = false;
  constructor(public nav: NavController, public navParams: NavParams, public service: Service, public values: Values, public translateService: TranslateService) {
    this.selectedFile = [];
  	this.form = {};
    this.banners = [];
  	this.form.currency = "USD";
  	this.language = "english"
    this.form.client_id = "";
    this.form.environment_sandbox = "";
    this.form.publish_key = "" ;
    this.form.secret_kay ="";

    this.service.getSetting().on('value', snapshot =>{
      if(snapshot.val()){
        this.form = snapshot.val();
      }  
    });

    this.service.getBanners().on('value', snapshot =>{
      this.banners[0] = snapshot.val().banners1;
      this.banners[1] = snapshot.val().banners2;
      this.banners[2] = snapshot.val().banners3;
    });

  }

	saveSetting(){
		this.service.addSettting(this.form)
		.then(() =>{
     this.values.currency = this.form.currency;
		 this.service.addBanner(this.banners)
      .then(() =>{
      this.nav.pop();
      });
		});
	}


 	onChange(event){
		this.values.changeLanguage(this.language);
	}


  onChangeBanner(event, i){
    this.selectedFile = event.target.files[0];
  //  this.disableSubmit = true;
    console.log(this.selectedFile);
    this.upLoadImg(i);
  }

  upLoadImg(i){

    // Create a root reference
    var fileName = this.selectedFile.name;
    var metadata = { contentType: 'image/jpeg'};
    var storageRef = firebase.storage().ref('/Banners/' + fileName);
  
    var uploadTask = storageRef.put(this.selectedFile, metadata);

      uploadTask.on('state_changed', (snapshot) => {
        console.log(snapshot);
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, (error) => {
      // Handle unsuccessful uploads
    },() => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
     this.banners[i] = uploadTask.snapshot.downloadURL;
        console.log(this.banners[i]);
      // this.disableSubmit = false;
      console.log("successful");
    });
  }

saveBanner(){
   this.service.addBanner(this.banners)
      .then(() =>{
        console.log('saved');
      });
}


}
