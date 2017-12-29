import { Component, OnInit} from '@angular/core';
import { Service } from '../../../providers/service';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Values } from '../../../providers/values';
import firebase from 'firebase';


/*
  Generated class for the Shop page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html'
})
export class ShopPage implements OnInit{

	categoryList: any;
  bannerList: any;
  brandBannerList: any;
  firebasedata: any;
  addProduct: any;
  data: any;
  products: any;
  loadedPoductList:any;
  poductList: any;
  brandList: any;
  base64: any;
constructor(public values:Values, private nativeStorage: NativeStorage, public nav: NavController, public navParams: NavParams, public service: Service, public translateService: TranslateService) {
  
  this.addProduct = firebase.database().ref('/product-List');
  this.categoryList = [];
  this.firebasedata = [];
  console.log('data');

  this.addProduct.on('value', poductList => {
  let products = [];
  poductList.forEach( product => {
    products.push(product.val());
    return false;
  });

  this.poductList = products;
  this.loadedPoductList = products;
});


}

ngOnInit(){
console.log('data');

  this.nativeStorage.getItem('firebasedatabanners')
    .then(
      data => this.handlebanners(data),
      error => console.error(error)
  );

  this.nativeStorage.getItem('firebasedatabrandbanners')
    .then(
      data => this.handlebanners(data),
      error => console.error(error)
  );

  this.nativeStorage.getItem('firebasedatacategories')
    .then(
      data => this.handlecategories(data),
      error => console.error(error)
  );

  this.service.getCategoryList().on('value', snapshot =>{
    
    this.categoryList = [];
    this.saveCategories(snapshot.val());
    snapshot.forEach( snap =>{
        this.categoryList.push({
          id: snap.key,
          name: snap.val().name,
          downloadURL: snap.val().downloadURL,
          description: snap.val().description
        });  
      });
    });


    this.service.getBanners().on('value', snapshot =>{
      this.bannerList = snapshot.val();
      this.saveBanners(snapshot.val());
    });

    this.service.getBrandBanners().on('value', snapshot =>{
      this.brandBannerList = snapshot.val();
      this.saveBrandBanners(snapshot.val());
    });

    this.service.getSetting().on('value', snapshot =>{
      if(snapshot.val()){
        this.values.currency = snapshot.val().currency;
      }
      
    });
     
  }

  getProducts(id){
    this.nav.push('ProductsPage', {id:id});
  }

  getBrands(item){
    console.log(item);
    this.nav.push('BrandProductsPage', item);
  }

  saveBanners(data){

    this.nativeStorage.setItem('firebasedatabanners', data)
    .then(
      () => console.log('Saved'),
      error => console.log('Error')
    );
  }

  saveBrandBanners(data){

    this.nativeStorage.setItem('firebasedatabrandbanners', data)
    .then(
      () => console.log('Saved'),
      error => console.log('Error')
    );
  }

  saveCategories(catsnap){
    this.nativeStorage.setItem('firebasedatacategories', catsnap)
    .then(
      () => console.log('Saved'),
      error => console.log('Error')
    );
  }

  handlebanners(data){
    this.bannerList = data;
    console.log(data);
  }

  handlecategories(data){
    this.categoryList = [];
    for(let item in data){
      this.categoryList.push({
          id: data[item].id,
          name: data[item].name,
          downloadURL: data[item].downloadURL,
          description: data[item].description
        });
    }  
    
  }


}

