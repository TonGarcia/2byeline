import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Service } from '../../../providers/service';
import firebase from 'firebase';

/*
  Generated class for the EditCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-edit-category',
  templateUrl: 'edit-category.html'
})
export class EditCategoryPage {

	files: any;
  category: any;
  snapshot: any;
  downloadURL: any;
  selectedFile: any;
  public fileName: any;
  public storageRef: any;
  public uploadTask: any;
  disableSubmit: boolean = false;
  errorMessage: any;
  constructor(public nav: NavController, public params: NavParams, public service: Service) {

    this.category = params.data;
   // this.downloadURL = "";
  }

  saveCategory(){
    if(this.validateForm()){
    	this.service.editCategory(this.category.name, this.category.description, this.category.id, this.category.downloadURL ).then(() =>{
    		this.nav.pop();
    	});
   }
  }

   validateForm(){
    if(this.category.name == undefined || this.category.name == ""){
     this.errorMessage = "Please Add Category Name"; 
        return false;
    }
    if(this.category.description == undefined || this.category.description == ""){
      this.errorMessage = "Please Add Description"; 
      return false;
    }
    if( this.category.downloadURL == undefined ||  this.category.downloadURL == ""){
      this.errorMessage = "Please Add Image"; 
      return false;
    }
    return true;
  }

   onChange(event){
    this.selectedFile = event.target.files[0];
    this.disableSubmit = true;
    console.log(this.selectedFile);
    this.upLoadImg();
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
     this.category.downloadURL = uploadTask.snapshot.downloadURL;
     this.disableSubmit = false;
        console.log(this.downloadURL);
      console.log("successful");
    });
  }

  

}
