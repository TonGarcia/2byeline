import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import firebase from 'firebase';
import { TranslateService } from '@ngx-translate/core';
import { Service } from '../../../providers/service';
import { Values } from '../../../providers/values';


/**
 * Generated class for the BrandProductsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-brand-products',
  templateUrl: 'brand-products.html',
})
export class BrandProductsPage {
	addProduct: any;
	productsList: any;
	name: any;
	cartItem: any = {};
 	price: any;
	listview: boolean = true;
  constructor(public navCtrl: NavController, public params: NavParams, public values:Values, public translateService: TranslateService, public service: Service) {
  	this.name = params.data;

  	this.addProduct = firebase.database().ref('/product-List');

  	this.addProduct.orderByChild("name").startAt(this.name).on('value', snapshot =>{
        this.productsList = [];
          snapshot.forEach( snap =>{
            this.productsList.push({
              category: snap.val().category,
              id: snap.key,
              in_stock: snap.val().in_stock,
              name: snap.val().name,
              downloadURL: snap.val().downloadURL,
              short_description: snap.val().short_description,
              description: snap.val().description,
              regular_price: snap.val().regular_price,
              sale_price: snap.val().sale_price
            });
          });
        });      
    }

  	setListView(){
	    this.values.listview = true;
	 }

    setGridView(){
   		this.values.listview = false;
    }

    deleteFromCart(id){
	    for(let item in this.service.cart.line_items){
	      if(id == this.service.cart.line_items[item].product_id){
	        this.service.cart.line_items[item].quantity -= 1;
	        this.service.proqty[id] -= 1;
	        this.values.qty -= 1;
	        this.service.total -= parseInt(this.service.cart.line_items[item].price);
	        if(this.service.cart.line_items[item].quantity == 0){
	          this.service.cart.line_items.splice(item, 1);
	        }
	      }
	    }
   }

 
    addToCart(id, name, image, regularPrice, salesPrice){

	    if(salesPrice){
	      this.price = salesPrice;
	    }else {this.price = regularPrice}

	 
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
	        this.cartItem.price = this.price;
	        this.service.total += parseInt(this.price);
	        this.values.qty += 1;
	        this.service.cart.line_items.push(this.cartItem);
	      }

	      this.cartItem = {};
    }
  
}
