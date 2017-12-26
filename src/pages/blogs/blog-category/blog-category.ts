import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { WpService } from '../../../providers/wp-service';


/*
  Generated class for the BlogCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-blog-category',
  templateUrl: 'blog-category.html'
})
export class BlogCategoryPage {
   
   categories: any;

  constructor(public nav: NavController, public navParams: NavParams, public wpService: WpService) {

  	this.wpService.load()
  	.then((results) => this.categories = results);
  }

  getPosts(id){
  	this.nav.push('BlogPostsPage', id);
  }

}
