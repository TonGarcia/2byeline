import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Service } from '../../../providers/service';
import { Values } from '../../../providers/values';
import { TranslateService } from '@ngx-translate/core';


/*
  Generated class for the ProductInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-product-info',
  templateUrl: 'product-info.html'
})
export class ProductInfoPage {

  productDetails: any;
  product: any;
  cartItem: any = {};
  quantity: any;


  constructor(public nav: NavController, public navParams: NavParams, public service: Service, public values: Values, public translateService: TranslateService) {

    this.quantity = "1";

  	this.service.getProductDetail(this.navParams.get('id')).on('value', (snapshot) => {
		  this.productDetails = snapshot.val();
		});

    console.log(this.service.cart);
  }




  addToCart(id, name, price, image){
 
      var itemAdded = false;
      for(let item in this.service.cart.line_items){
        if(id == this.service.cart.line_items[item].product_id){
          this.service.cart.line_items[item].quantity += 1;
          this.service.proqty[id] += 1;
          this.service.total += parseInt(this.service.cart.line_items[item].price);
          this.values.qty += 1;
          var itemAdded = true;
        }
      }

      if(!itemAdded){
        this.cartItem.product_id = id;
        this.cartItem.quantity = 1;
        this.service.proqty[id] = 1;
        this.cartItem.name = name;
        this.cartItem.image = image;
        this.cartItem.price = price;
        this.service.total += parseInt(price);
        this.values.qty += 1;
        this.service.cart.line_items.push(this.cartItem);
        console.log(this.service.cart.line_items);
      }

      this.cartItem = {};

  }


getCart(){
  this.nav.push('Cart');
}


  
}
