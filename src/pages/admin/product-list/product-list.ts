import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Values } from '../../../providers/values';
import { Service } from '../../../providers/service';


/*
  Generated class for the ProductList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html'
})
export class ProductListPage {

  productList: any;
    

  constructor(public navCtrl: NavController, public params: NavParams, public service: Service, public values:Values) {

    this.service.getProductList().on('value', snapshot => {

      this.productList = [];

      snapshot.forEach( snap => {

        this.productList.push({
          id: snap.key,
          in_stock: snap.val().in_stock,
          name: snap.val().name,
          downloadURL: snap.val().downloadURL,
          short_description: snap.val().short_description,
          description: snap.val().description,
          regular_price: snap.val().regular_price,
          sale_price: snap.val().sale_price,
          category: snap.val().category,
          brand: snap.val().brand,
          vendor: snap.val().vendor
        });

      });
    
     });
  }

  add(){
    this.navCtrl.push('AddProductPage');
  }


  deleteProduct(id){
    this.service.delPro(id);
  }

  edit(product){
    this.navCtrl.push('EditProductPage', product);
  }
  
 
}
