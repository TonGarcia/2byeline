import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Service } from '../../../providers/service';
import firebase from 'firebase';

/*
  Generated class for the EditProduct page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html'
})
export class EditProductPage {

  id: any;
	product:any; 
  metadata: any;
  fileName: any;
  storageRef: any;
  uploadTask: any;
  downloadURL: any;
  selectedFile: any;
  brandName: any;
  vendorName: any;
  categoryName: any;
  errorMessage: any;
  disableSubmit: boolean = false;

  constructor(public navCtrl: NavController, public params: NavParams, public service: Service) {
  	
    this.product = params.data;
    //this.downloadURL = "";

        this.service.getCategoryList().on('value', snapshot => {

      this.categoryName = [];

      snapshot.forEach( snap => {
        this.categoryName.push({
        id: snap.key,
        name: snap.val().name,
      
        });
      });
    });

      this.service. getBrandList().on('value', snapshot => {

      this.brandName = [];

      snapshot.forEach( snap => {
        this.brandName.push({
        id: snap.key,
        name: snap.val().name,
      
        });
      });
    });


  this.service.getVendorList().on('value', snapshot => {

      this.vendorName = [];

      snapshot.forEach( snap => {
        this.vendorName.push({
        id: snap.key,
        name: snap.val().name,
      
        });
      });
    });


  }

  editProduct(){
    if(this.validate()){
       this.service.editPro(this.product.name, this.product.short_description, this.product.description, this.product.regular_price, this.product.sale_price, this.product.in_stock, this.product.downloadURL, this.product.brand, this.product.vendor, this.product.category, this.product.id).then( () =>{
      		this.navCtrl.pop();
       });
    }
  }

  onChange(event){
    this.selectedFile = event.target.files[0];
    this.disableSubmit = true;
    console.log(this.selectedFile);
    this.upLoad();
  }


  upLoad(){

    var fileName = this.selectedFile.name;

    var storageRef = firebase.storage().ref('Products Image/' + fileName);

    var metadata = {contentType: 'image/jpeg'};

    var uploadTask = storageRef.put(this.selectedFile, metadata);

    uploadTask.on('state_changed', (snapshot) =>{
      console.log(snapshot);

      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('upload' + progress + '% done');

      switch(snapshot.state){
        case firebase.storage.TaskState.PAUSED: 
          console.log('upload is paused');
          break;

        case firebase.storage.TaskState.RUNNING:
          console.log('upload is running');
          break;  
      }

      }, (error) =>{
          console.log(error);
        }, () =>{

          this.product.downloadURL = uploadTask.snapshot.downloadURL;
          this.disableSubmit = false;
          console.log(this.downloadURL);
          console.log("successfully uploaded");
    });
  }

  validate(){
     if(this.product.name == undefined || this.product.name == ''){
      this.errorMessage = 'Please Add Product Name';
      return false;
    }
    if(this.product.category == undefined || this.product.category == ''){
      this.errorMessage = 'Please Add Category';
      return false;
    }
    if(this.product.regular_price == undefined || this.product.regular_price == ''){
      this.errorMessage = 'Please Add Regular Price';
      return false;
    }

    if(this.product.sale_price == undefined || this.product.sale_price == ''){
      this.errorMessage = 'Please Add Sale Price';
      return false;
    } 
    if(this.product.short_description == undefined || this.product.short_description == ''){
      this.errorMessage = 'Please Add Short Description';
      return false;
    }
    if(this.product.description == undefined || this.product.description == ''){
      this.errorMessage = 'Please Add Description';
      return false;
    }
    if(this.product.downloadURL == undefined || this.product.downloadURL == ''){
      this.errorMessage = 'Please Add Image';
      return false;
    }
   
    return true;
  }
  
}
