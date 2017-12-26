import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../../providers/service';

/**
 * Generated class for the EditVendor page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-vendor',
  templateUrl: 'edit-vendor.html',
})
export class EditVendor {

	vendor: any;
  errorMessage: any;
  constructor(public nav: NavController, public params: NavParams, public service: Service) {
  	this.vendor = params.data;
  }


  saveVendor(){
    if(this.validateForm()){
    	this.service.editVendor(this.vendor.name, this.vendor.description, this.vendor.id).then(() =>{
    		this.nav.pop();
    	});
    }
  }
 
   validateForm(){
    if(this.vendor.name == undefined || this.vendor.name == ""){
       this.errorMessage = "Please Enter Name";
       return false;
    }
    if(this.vendor.description == undefined || this.vendor.description == ""){
       this.errorMessage = "Please Description";
      return false;
    }
    return true;
  }

}
