import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../../providers/service';

/**
 * Generated class for the EditBrand page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-brand',
  templateUrl: 'edit-brand.html',
})
export class EditBrand {
  brand:any;
  errorMessage: any;
  constructor(public nav: NavController, public params: NavParams, public service: Service) {
  	this.brand = params.data;
  }


  
     saveBrand(){
      if(this.validateForm()){
    	this.service.editBrand(this.brand.name, this.brand.description, this.brand.id).then(() =>{
    		this.nav.pop();
    	})
    }
  }

  validateForm(){
    if(this.brand.name == undefined || this.brand.name == ""){
      this.errorMessage =  "Please Add Brand Name";
       return false;
    }
    if(this.brand.description == undefined || this.brand.description == ""){
      this.errorMessage = "Please Description"; 
      return false;
    }
    return true;
  }
}
