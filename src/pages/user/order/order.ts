import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Values } from '../../../providers/values';
import { Service } from '../../../providers/service';

/**
 * Generated class for the Order page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class Order {

	orderDetails : any;
  constructor(public navCtrl: NavController, public params: NavParams, public values: Values, public service: Service ) {
  	
  	this.service.getOrderDetail(this.params.get('id')).on('value', (snapshot) => {
		  this.orderDetails = snapshot.val();
		});
  	
  }
 
}
