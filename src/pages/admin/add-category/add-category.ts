import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Service } from '../../../providers/service';
import { Functions } from '../../../providers/functions/functions';
import firebase from 'firebase';


/*
  Generated class for the AddCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-add-category',
  templateUrl: 'add-category.html'
})
export class AddCategoryPage {

	form: any;
  files: any;
  snapshot: any;
  downloadURL: any;
  categoryPic: any;
  selectedFile: any;
  public fileName: any;
  public storageRef: any;
  public uploadTask: any;
  errorMessage: any;
  disableSubmit: boolean = false;

  constructor(public nav: NavController, public params: NavParams, public service: Service, public functions: Functions) {

  	this.form = {};
    this.service = service;

  
  }


  addCategry(){
    if(this.validateForm()){
    
    	this.service.addCat(this.form.name, this.form.description, this.downloadURL )
      .then(() => {
        this.nav.pop();     
      });
    }
  }

  onChange(event){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.disableSubmit = true;
    this.upLoadImg();
  }

    validateForm(){
    if(this.form.name == undefined || this.form.name == ""){
     this.errorMessage = "Please Add Category Name"; 
        return false;
    }
    if(this.form.description == undefined || this.form.description == ""){
      this.errorMessage = "Please Add Description"; 
      return false;
    }
    if( this.downloadURL == undefined ||  this.downloadURL == ""){
      this.errorMessage = "Please Add Image"; 
      return false;
    }
    return true;
  }



  upLoadImg(){

    // Create a root reference
    var fileName = this.selectedFile.name;
    var metadata = { contentType: 'image/jpeg'};
    var storageRef = firebase.storage().ref('/images/' + fileName);
  
    var uploadTask = storageRef.put(this.selectedFile, metadata);

      uploadTask.on('state_changed', (snapshot) => {
        console.log(snapshot);
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (uploadTask.snapshot.state) {
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
     this.downloadURL = uploadTask.snapshot.downloadURL;
        this.disableSubmit = false;
        console.log(this.downloadURL);
      console.log("successful");
    });
  }





 
}
