import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Auth } from '../../../providers/auth';

/*
  Generated class for the Resetpassowrd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-resetpassowrd',
  templateUrl: 'resetpassowrd.html'
})
export class ResetpassowrdPage {

	loginData:any;
  buttonText: any = "Reset Password";
  errorMessage: any;
  disableSubmit: boolean = false;

  constructor(public nav: NavController, public navParams: NavParams, public auth: Auth) {
  	this.loginData = [];
 }

  forgotten(){
    if(this.validate()){
      this.disableSubmit = true;
      this.buttonText = "Sending Mail..";
      this.auth.forgotPass(this.loginData.email).then(() =>{
        return this.nav.push('LoginPage');
      }).catch(err => {this.handleError(err)});
    }
  }
  handleError(err){
        this.disableSubmit = false;
        this.buttonText = "Reset Password";
        console.log(err.code);
        this.errorMessage = err.message;
        this.disableSubmit = false;
  }
  validate(){
    if(this.loginData.email == undefined || this.loginData.email == ''){
      this.errorMessage = 'Please enter email';
      return false;
    }
    return true;
  }
  
}
