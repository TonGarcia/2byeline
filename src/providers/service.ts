import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { Config } from './config';
import { URLSearchParams } from '@angular/http';

/*
  Generated class for the Service provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Service {
  setting: any;
  product_id: Array<number> = [];
  url: any;
  cart: any;
  params:any;
  orderLists: any;
  public ref: any;  
  productsList:any;
  customerList: any;
  public orderList: any;
  public brandList: any;
  public vendorList: any;  
  public addProduct: any;
  public addCategory: any;
  public profilePictureRef: any; 
  public currentUser: any;
  public user: any;
  total: number = 0.00;
  proqty: Array<number> = [];
  getSecKey: any;
  users: any;
  bannerList: any;
  customerRole: any;
  name: any;
  brandBannerList: any;
  chrg: any;
  prob: any;
  constructor(public http: Http, private config: Config) {

    this.url = this.config.url;
    this.cart = { "line_items": [], };
    this.currentUser = firebase.auth().currentUser;
    this.setting = firebase.database().ref('/Setting');
    this.bannerList = firebase.database().ref('/Banners');
    this.orderList = firebase.database().ref('/Order-List'); 
    this.brandList = firebase.database().ref('/Brand-List'); 
    this.vendorList = firebase.database().ref('/Vendor-List'); 
    this.addProduct = firebase.database().ref('/product-List');
    this.addCategory = firebase.database().ref('/Category_List'); 
    this.customerList = firebase.database().ref('/Customer-List' );
    this.customerRole = firebase.database().ref('/Customer-Role');
    this.brandBannerList = firebase.database().ref('/Brad-Banners');

  }

  // Customer and Admin App functions

  getBanners(): any{
    return this.bannerList;
  }

  getBrandBanners(): any{
    return this.brandBannerList;
  }

  getCategoryList(): any {
    return this.addCategory;
  }

  getProductLists(id){
    this.productsList = this.addProduct.orderByChild("category").equalTo(id.id);
    return this.productsList;
  }

  getSortProductLists(name){
    if(name == "Puma"){
       this.productsList = this.addProduct.orderByChild("brand").equalTo(name);
      return this.productsList;
    }
   
  }


  address(address: String, id:any, phone){
    var postsRef = this.customerList.child( id );
    postsRef.update({
      address: address,
      phone: phone
    });  
  }

  getProductDetail(id): any {
    return this.addProduct.child(id);
  }

  delOrder(id){
    return this.orderList.child(id).remove();
  }

  getOrderDetail(id){
    return this.orderList.child(id);
  }


  getUserProfile(id): any {
    return this.customerList.child(id);
  }

  addOrders(order:String, total:number, uid:String, payments:String, userProfiles:String){
    return this.orderList.push({
      email: uid,
      items: order,
      total: total,
      payments: payments,
      customerDetails: userProfiles,
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      reverseOrder: 0 - Date.now()
    }).then( newOrder => {
      this.orderList.child(newOrder.key).child('id').set(newOrder.key);
    });
  }

  chargeStripe(token, currency, amount, secret_kay){
      this.getSecKey = secret_kay;
    var headers = new Headers();
    var params = new URLSearchParams();
    
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Bearer ' + secret_kay); 
   
    params.append("amount", amount);
    params.append("currency", currency);
    params.append("description", "description");
    params.append("source", token);

    return new Promise(resolve => {  
      this.http.post(  'https://api.stripe.com/v1/charges', params, { headers: headers }).map(res => res.json())
        .subscribe(data => {
          this.chrg = data;
          resolve(this.chrg);
        },  err => {


          resolve(JSON.parse(err._body));console.log(err._body)
            this.prob = err;


          });
      
    });
  }

  

  getSetting(){
    return this.setting;
  }

  getMyOrderList(id){
    console.log(id);
    this.orderLists =  this.orderList.orderByChild("email").equalTo(id);//.orderByChild("timeStamp");
    return this.orderLists;
  }

  getRole(id){
    return this.customerRole.orderByChild("uid").equalTo(id);
  }

  // End of Customer and Admin Functions



  // Admin Only Functions. Delete from here for customer only App
  addBanner(banners){
    return this.bannerList.set({
    banners1: banners[0],
    banners2: banners[1],
    banners3: banners[2]
    });
  }


  addBrandBanner(banners){
    return this.brandBannerList.set({
    brandBanners1: banners[0],
    brandBanners2: banners[1],
    brandBanners3: banners[2]
    });
  }

  addSettting(form){
    return this.setting.set({
      cod: form.cod,
      stripe: form.stripe,
      paypal: form.paypal,
      currency: form.currency,
      client_id: form.client_id,
      environment_sandbox: form.environment_sandbox,
      publish_key: form.publish_key,
      secret_kay: form.secret_kay
    });
  }

  addBrands(name:String, description:String){
    return this.brandList.push({
      name: name,
      description: description,
    }).then( newBrand => {
      this.brandList.child(newBrand.key).child('id').set(newBrand.key);
    });
  }

  addVendors(name:String, description:String){
    return this.vendorList.push({
      name: name,
      description: description,
    }).then( newVendor => {
      this.vendorList.child(newVendor.key).child('id').set(newVendor.key);
    });
  }

  addPro(name:string, short_description:string, description:string, regular_price:number, sale_price:number, in_stock:string, downloadURL:any, category:any, vendor: any, brand: any ){
    return this.addProduct.push({

      category: category,
      name: name,
      short_description: short_description,
      description: description,
      regular_price: regular_price,
      sale_price:sale_price,
      downloadURL:downloadURL,
      in_stock: in_stock,
      brand: brand,
      vendor: vendor,
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      reverseOrder: 0 - Date.now()

    }).then( newProduct =>{
      
         this.addProduct.child(newProduct.key).child('id').set(newProduct.key);
   }) ;
  }

  addCat(name:String, description:String, downloadURL:any){
    return this.addCategory.push({

      name: name,
      description: description,
      downloadURL: downloadURL

    }) .then( newCategory => {
        this.addCategory.child(newCategory.key).child('id').set(newCategory.key);
    });
  }

  editCategory(name:string, description:string, id, downloadURL:any){
    return this.addCategory.child(id).update({
      name: name,
      description: description,
     downloadURL:downloadURL
    });
  }

   editBrand(name:string, description:string, id){
    return this.brandList.child(id).update({
      name: name,
      description: description
    });
  }

  editVendor(name:string, description:string, id){
    return this.vendorList.child(id).update({
      name: name,
      description: description
    });
  }

  editCustomers(displayName: String, phone:String, address: String, role:String, id: any){
    return this.customerList.child(id).update({
      displayName: displayName,
      phoneNumber: phone,
      address: address,
     // role: role,
    }),

    this.customerRole.child(id).set({
      
      role: role
    });
  }

  getCustomerRole(){
    return this.customerRole;
  }
   
  saveCustomers(displayName: String, phone:String, address: String, id: any){
    return this.customerList.child(id).update({
      displayName: displayName,
      phoneNumber: phone,
      address: address,
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      reverseOrder: 0 - Date.now()
    });
  }

  editPro(name:string, short_description:any, description:any, regular_price:number, sale_price:number, in_stock:any, downloadURL:any, brand: any, vendor: any, category: any, id:any){
    return this.addProduct.child(id).update({
      name: name,
      short_description: short_description,
      description: description,
      regular_price: regular_price,
      sale_price: sale_price,
      in_stock: in_stock,
      downloadURL: downloadURL,
      brand: brand,
      vendor: vendor,
      category: category
    }) ;
  }

  getProductList(): any {
    return this.addProduct;
  }

   getBrandList(): any {
    return this.brandList;
  }

   getVendorList(): any {
    return this.vendorList;
  }

  getCustomerList(): any{
    return this.customerList;
  }

  delVendor(id){
    return this.vendorList.child(id).remove();
  }

  delBrand(id){
    return this.brandList.child(id).remove();
  }

  delCat(id){
    return this.addCategory.child(id).remove();
  }

  delPro(id){
    return this.addProduct.child(id).remove();
  }
  
  deleteCustomers(id){
    return this.customerList.child(id).remove();
    
  }

  getOrderList(){
    return this.orderList.orderByChild("reverseOrder");
  }

  // End Admin Only Functions. Delete till here for customer only App


     /*chargepagomio(token){
   
    var params = new URLSearchParams();
    params.append("source", token);

    return new Promise(resolve => {  
      this.http.post(  'https://sandbox.pagomio.com/payment/token/', params).map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  });
  
  }*/

}
