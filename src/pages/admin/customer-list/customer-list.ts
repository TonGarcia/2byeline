import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Service } from '../../../providers/service';
import firebase from 'firebase';


/*
  Generated class for the CustomerList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-customer-list',
  templateUrl: 'customer-list.html'
})
export class CustomerListPage {
	customerList: any;
  currentUser: any;
  user: any;
  customerRole: any;
  constructor(public nav: NavController, public navParams: NavParams, public service: Service) {

   this.currentUser = firebase.auth().currentUser;
     this.user = firebase.auth().currentUser;
     this.customerRole = {};
  	this.service.getCustomerList().on('value', snapshot =>{

  		this.customerList = [];

  		snapshot.forEach(snap =>{
  			this.customerList.push({
  				id: snap.key,
	  			displayName: snap.val().displayName,
	  			email: snap.val().email,
          address: snap.val().address,
          phone: snap.val().phone
  			});
  		});
    });	


    this.service.getCustomerRole().on('value', snapshot =>{
      if(snapshot.val()){
        this.customerRole = snapshot.val();
      }
      
    }); 

  }


  addCustomer(){
  	this.nav.push('AddCustomerPage');
  }

  editCustomer(item){
    if(this.customerRole[item.id] != undefined){
      item.role = this.customerRole[item.id].role;
    }
  	this.nav.push('EditCustomerPage', item);
  }

  deleteCustomer(id){

  	this.service.deleteCustomers(id);
    this.user.delete().then(() =>{

     });
  }  



  getUser(){
    this.nav.push('Profile');
  }

}
