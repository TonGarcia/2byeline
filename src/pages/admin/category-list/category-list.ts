import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Service } from '../../../providers/service';

/*
  Generated class for the CategoryList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html'
})
export class CategoryListPage {

   categoryList: any;
   category: any;

  constructor(public nav: NavController, public params: NavParams, public service: Service) {


  	this.service.getCategoryList().on('value', snapshot => {

  	  this.categoryList = [];

  	  snapshot.forEach( snap => {
    	  this.categoryList.push({
    	  id: snap.key,
    		name: snap.val().name,
    		downloadURL: snap.val().downloadURL,
    		description: snap.val().description
    		});
  	  });
    });

  }


  editCategory(category){
     this.nav.push('EditCategoryPage', category);
  }
  
  addCat(){
  	this.nav.push('AddCategoryPage');
  }

  deleteCategory(id){
  	this.service.delCat(id);
  }

}
