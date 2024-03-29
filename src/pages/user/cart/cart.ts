import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../../providers/service';
import { Values } from '../../../providers/values';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { Functions } from '../../../providers/functions/functions';
import { Stripe } from '@ionic-native/stripe';
import firebase from 'firebase'
import { TranslateService } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the Cart page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class Cart {
  buttonText:any;
  disableSubmit: boolean = false;
  currentUser: any;
  paypalPayments: any;
  form: any;
  getToken: any;
  getError: any;
  getPayments: any;
  setting: any;
  payments: any;
  userProfiles: any;
  Checkout: any;
  body: any;
  status: any;
  datas: any;
  ref: any;
  constructor(public http: Http, private iab: InAppBrowser, public nav: NavController, public params: NavParams, public functions: Functions, public service: Service, public values:Values, private payPal: PayPal, private stripe: Stripe, public translateService: TranslateService) {
    this.Checkout = "cart"
    this.payments = [];
    this.form = {}; 
    this.buttonText= "Place Order";
    this.currentUser = firebase.auth().currentUser;
    console.log(this.service.total);
    if(this.values.isLoggedIn){
       this.service.getUserProfile(this.values.id).on('value', snapshot =>{
         this.userProfiles = snapshot.val();

      });
    }

    this.service.getSetting().on('value', snapshot =>{
      this.setting  = snapshot.val();
      console.log(this.setting);
    });

    this.ref = Math.floor(Math.random() * 200000);
      function randomWholeNum() {
          // Only change code below this line.
          return Math.random();
    }
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

 
  addToCart(id){
 
      for(let item in this.service.cart.line_items){
        if(id == this.service.cart.line_items[item].product_id){
          this.service.cart.line_items[item].quantity += 1;
          this.service.proqty[id] += 1;
          this.service.total += parseInt(this.service.cart.line_items[item].price);
          this.values.qty += 1;
        }
      }

  }



  placeOrder(item){
    this.disableSubmit = true;
    this.buttonText = "Placing Order";
      if(this.values.isLoggedIn){

         
         this.service.getUserProfile(this.values.id).on('value', snapshot =>{
                      this.userProfiles = snapshot.val();
                  });
            console.log(this.userProfiles);
          if(this.userProfiles.address == ''|| this.userProfiles.address == undefined){

               this.nav.push('Address', this.userProfiles);
            this.disableSubmit = false;         
          }
        
          else{
           
              if( this.form.payment_method == "paypal"){

                


                  if(this.userProfiles.address == ''|| this.userProfiles.address == undefined ){

                       this.nav.push('Address', this.userProfiles);
                        this.disableSubmit = false;
                  }
                  else{

                this.payPal.init({
                  PayPalEnvironmentProduction: this.setting.client_id,
                  PayPalEnvironmentSandbox: this.setting.environment_sandbox
                }).then(() => {
                // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
                   this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
                  // Only needed if you get an "Internal Service Error" after PayPal login!
                  //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
                })).then(() => {
                 this.disableSubmit = false;
                 let payment = new PayPalPayment(this.service.total.toString(), this.values.currency, 'Sales of Goods', 'sale');
                    this.payPal.renderSinglePaymentUI(payment).then((success) => {

                        this.paypalPayments =success;
                        // Successfully paid

                        // Example sandbox response
                        //
                        // {
                        //   "client": {
                        //     "environment": "sandbox",
                        //     "product_name": "PayPal iOS SDK",
                        //     "paypal_sdk_version": "2.16.0",
                        //     "platform": "iOS"
                        //   },
                        //   "response_type": "payment",
                        //   "response": {
                        //     "id": "PAY-1AB23456CD789012EF34GHIJ",
                        //     "state": "approved",
                        //     "create_time": "2016-10-03T13:33:33Z",
                        //     "intent": "sale"
                        //   }
                        // }
                        this.payments.paymentType = this.form.payment_method;
                        this.payments.id = this.paypalPayments.response.id;
                        this.payments.status = this.paypalPayments.response.state;
                        this.disableSubmit = false;
                        //this.customerDetails = this.userProfiles;
                        this.functions.showAlert('Success',  'Your order has been placed Successfully');
                        this.service.addOrders( item, this.service.total, this.values.id, this.payments, this.userProfiles).then(()=>{
                        //  this.nav.setRoot('OrderList');
                          this.service.cart.line_items = []; 
                           this.values.qty = null;
                           this.service.proqty = [];
                           this.service.total = 0;
                         });
                      }, (error) => {
                        // Error or render dialog closed without being successful
                        console.log(error);
                        this.functions.showAlert('Error', error.message);
                      });

                      }, (error) => {
                      // Error in configuration
                        console.log(error);
                        this.functions.showAlert('Error', error.message);
                      });
                       }, (error) => {
                      console.log(error);
                      // Error in initialization, maybe PayPal isn't supported or something else
                      this.functions.showAlert('Error', error);
                      this.disableSubmit = false;
                  });
              }

                  }



               else if( this.form.payment_method == "stripe"){
                  this.service.getUserProfile(this.currentUser.uid).on('value', snapshot =>{
                        this.userProfiles = snapshot.val();
                  });

                  if(this.userProfiles.address != undefined && this.userProfiles.phone != undefined){

                    this.stripe.setPublishableKey(this.setting.publish_key);

                    let card = {
                     number: this.form.stripe_number,
                     expMonth: this.form.stripe_exp_month,
                     expYear: this.form.stripe_exp_year,
                     cvc: this.form.stripe_code
                    };

                    this.stripe.createCardToken(card)
                      .then((token) =>{
                          console.log(token);
                          this.getToken = token;


                              this.service.chargeStripe(this.getToken.id, this.values.currency, this.service.total, this.setting.secret_kay)
                                .then((results) => this.getPayments = results);


                      

                           this.payments.paymentType = this.form.payment_method;
                           this.payments.id = this.getPayments.id;
                           this.payments.status = this.getPayments.status;
                           this.payments.amount = this.getPayments.amount;
                           
                            this.disableSubmit = false;
                            this.functions.showAlert('Success',  'Your order has been placed Successfully');
                            this.service.addOrders( item, this.service.total, this.currentUser.uid, this.payments, this.userProfiles).then(()=>{
                             //  this.nav.setRoot('OrderList');
                               this.service.cart.line_items = []; 
                               this.values.qty = null;
                               this.service.proqty = [];
                               this.service.total = 0;
                            });
                      })
                      .catch((error) =>{
                          this.disableSubmit = false;
                          this.functions.showAlert('Error', error);
                          this.disableSubmit = false;
                          console.error(error)})
                      .catch((error) =>{
                          this.functions.showAlert('Error', error);
                          this.disableSubmit = false;
                      }); 
                  }
              }

             else if (this.form.payment_method == "cod") {

                 


                  if(this.userProfiles.address == ''|| this.userProfiles.address == undefined ){

                       this.nav.push('Address', this.userProfiles);
                        this.disableSubmit = false;
                  }

                  else{
                      this.payments.PaymentType = this.form.payment_method;
                      this.functions.showAlert('Success',  'Your order has been placed Successfully');
                      this.service.addOrders( item, this.service.total, this.values.id, this.payments, this.userProfiles).then(()=>{
                        // this.nav.setRoot('OrderList');     
                           this.service.cart.line_items = []; 
                           this.disableSubmit = false;
                           this.values.qty = null;
                           this.service.proqty = []; 
                           this.service.total = 0;      
                      });        
                  }
              }

          } 
      }  
  

      else{
        this.nav.parent.select(2);
          this.disableSubmit = false;
      }
  }


 

  /*empty(){
    this.nav.setRoot('ShopPage')
  }*/

}
