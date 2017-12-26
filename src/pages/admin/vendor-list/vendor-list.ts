import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../../providers/service';

/**
 * Generated class for the VendorList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vendor-list',
  templateUrl: 'vendor-list.html',
})
export class VendorList {
	vendorList: any;

  constructor(public nav: NavController, public navParams: NavParams, public service: Service) {

  this.service.getVendorList().on('value', snapshot => {
      this.vendorList = [];

      snapshot.forEach( snap => {
        this.vendorList.push({
        id: snap.key,
        name: snap.val().name,
        description: snap.val().description
        });
      });
    });
  }

  addVendor(){
  	this.nav.push('AddVendor')
  }

  editVendor(item){
    this.nav.push('EditVendor', item)
  }

  deleteVendor(id){
    this.service.delVendor(id);
  }
}
