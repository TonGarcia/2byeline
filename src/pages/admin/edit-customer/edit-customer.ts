import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Service } from '../../../providers/service';
import { Values } from '../../../providers/values';
import firebase from 'firebase';

/*
  Generated class for the EditCustomer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-edit-customer',
  templateUrl: 'edit-customer.html'
})
export class EditCustomerPage {
  
	customer: any = {};
  currentUser: any;
  errorMessage: any;
  constructor(public nav: NavController, public params: NavParams, public service: Service, public values:Values) {
  	this.customer = params.data;    
     this.currentUser = firebase.auth().currentUser;
  }

  saveCustomer(){
    	this.service.editCustomers(this.customer.displayName, this.customer.phone, this.customer.address, this.customer.role,  this.customer.id)
      .then(() =>{
      	this.nav.pop();
     	}).catch( (error) => {this.handleErrors(error);
        });
  }


    handleErrors(error){

  this.errorMessage = error.message;
  console.log(error);
}
}
