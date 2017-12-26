import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../../providers/service';

/**
 * Generated class for the BrandList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-brand-list',
  templateUrl: 'brand-list.html',
})
export class BrandList {
  brandList:any;

  constructor(public nav: NavController, public navParams: NavParams, public service:Service) {

    this.service.getBrandList().on('value', snapshot => {

      this.brandList = [];

      snapshot.forEach( snap => {
        this.brandList.push({
        id: snap.key,
        name: snap.val().name,
        description: snap.val().description
        });
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrandList');
  }


  addBrand(){
  	this.nav.push('AddBrand')
  }

  editBrand(item){
    this.nav.push('EditBrand', item)
  }

  deleteBrand(id){
    this.service.delBrand(id);
  }

}
