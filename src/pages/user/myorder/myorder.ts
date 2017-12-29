import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../../providers/service';
import { Values } from '../../../providers/values';
import firebase from 'firebase';

/**
 * Generated class for the MyorderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-myorder',
  templateUrl: 'myorder.html',
})
export class MyorderPage {
	currentUser: any;
	myOrderList: any;
	id:any;
  constructor(public nav: NavController, public navParams: NavParams, public service:Service, public values:Values) {

  	this.currentUser = firebase.auth().currentUser;

  	this.service.getMyOrderList(this.currentUser.uid).on('value', snapshot =>{
    		this.myOrderList = [];

    			 snapshot.forEach( snap => {
      	 	 this.myOrderList.push({
  		    	  id: snap.key,
  		    		items: snap.val().items,
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

  

}
