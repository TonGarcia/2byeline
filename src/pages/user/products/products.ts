import { Component } from '@angular/core';
import { Values } from '../../../providers/values';
import { Service } from '../../../providers/service';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


/*
  Generated class for the Products page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})
export class ProductsPage {

	productsList: any;
  listview: boolean = true;
  id: any;
  quantity: any;
  cartItem: any = {};
  price: any;

  constructor(public nav: NavController, public params: NavParams, public service: Service, public values:Values, public translateService: TranslateService ) {
    this.id = params.data;

  	this.service.getProductLists(this.id).on('value', snapshot =>{
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



  

  getProductDetails(id){
    this.nav.push('ProductInfoPage', {id: id});
  }
  
  setListView(){
    this.values.listview = true;
  }

  setGridView(){
    this.values.listview = false;
  }

 
   

}
