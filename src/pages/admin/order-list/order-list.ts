import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../../providers/service';
import { Values } from '../../../providers/values';
//import firebase from 'firebase';


/**
 * Generated class for the OrderList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderList {

	orderList: any;
  id:any;
  //currentUser: any;
  constructor(public nav: NavController, public params: NavParams, public service: Service, public values:Values) {
   // this.currentUser = firebase.auth().currentUser;

    	this.service.getOrderList().on('value', snapshot =>{
    		this.orderList = [];
        console.log(snapshot.val());
    			 snapshot.forEach( snap => {
      	 	 this.orderList.push({
  		    	  id: snap.key,
  		    		items: snap.val().items,
              customerDetails: snap.val().customerDetails,
              payments: snap.val().payments,
              deliveryDate: snap.val().deliveryDate,
              total: snap.val().total
      	   });
    	  });
      });
  }

  deleteOder(id){
  	this.service.delOrder(id);
  }


  getOrderDetails(id){
  	console.log(id);
   this.nav.push('Order', {id: id});
  }

  login(){
    this.nav.setRoot('LoginPage');
  }

  
}
