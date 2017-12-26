import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';


/*
  Generated class for the Admin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
  currentUser: any;
  constructor(public nav: NavController, public navParams: NavParams) {

   
  }


  categoryList(){
  	this.nav.push('CategoryListPage')
  }

  productsList(){
    this.nav.push('ProductListPage');
  }

  customerList(){
    this.nav.push('CustomerListPage');
  }

    brandList(){
    this.nav.push('BrandList');
  }

    vendorList(){
    this.nav.push('VendorList');
  }

  orderList(){
    this.nav.push('OrderList' );
  }

  setting(){
    this. nav.push('SettingsPage')
  }
}
