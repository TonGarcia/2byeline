import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../../providers/service';
import { Functions } from '../../../providers/functions/functions';

/**
 * Generated class for the AddBrand page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-brand',
  templateUrl: 'add-brand.html',
})
export class AddBrand {
	form:any;
  errorMessage: any;
  constructor(public nav: NavController, public navParams: NavParams, public service: Service, public functions: Functions) {
  	this.form = {};
  }

 

   addBrand(){
    if(this.validateForm()){

    	this.service.addBrands(this.form.name, this.form.description)
      .then(() => {
        this.nav.pop();     
      });
    }
  }

   validateForm(){
    if(this.form.name == undefined || this.form.name == ""){
      this.errorMessage =  "Please Add Brand Name";
       return false;
    }
    if(this.form.description == undefined || this.form.description == ""){
      this.errorMessage = "Please Description"; 
      return false;
    }
    return true;
  }


}
