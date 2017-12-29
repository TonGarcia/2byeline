import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../../providers/service';
import  firebase from 'firebase';


/**
 * Generated class for the Address page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class Address {

	form: any;
  currentUser: any;
  errorMessage: any;
  customer: any;
  constructor(public nav: NavController, public params: NavParams, public service: Service) {
  	this.form = {};
    this.currentUser = firebase.auth().currentUser;
    console.log(this.currentUser);
    this.customer = params.data;
  }



  /*addAddress(){
  	this.service.address( this.form.address, this.currentUser.uid, this.form.phone );
   	this.nav.setRoot('Cart');
  }*/


  addAddress(){
      this.service.saveCustomers(this.customer.displayName, this.customer.phoneNumber, this.customer.address, this.currentUser.uid)
      .then(() =>{
        this.nav.pop();
      });
  }



}
