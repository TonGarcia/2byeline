import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { Service } from '../../../providers/service';
import { Functions } from '../../../providers/functions/functions';

/**
 * Generated class for the AddVendor page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-vendor',
  templateUrl: 'add-vendor.html',
})
export class AddVendor {
	form:any;
  errorMessage: any;
  constructor(public nav: NavController, public service: Service, public functions: Functions) {
  	this.form = {};
  }

  addVendor(){
    if(this.validateForm()){
    	this.service.addVendors(this.form.name, this.form.description)
      .then(() => {
        this.nav.pop();     
      });
    }
  }

   validateForm(){
    if(this.form.name == undefined || this.form.name == ""){
       this.errorMessage = "Please Enter Name";
       return false;
    }
    if(this.form.description == undefined || this.form.description == ""){
       this.errorMessage = "Please Description";
      return false;
    }
    return true;
  }

}
