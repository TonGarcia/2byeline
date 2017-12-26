import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { WpService } from '../../../providers/wp-service';

/*
  Generated class for the BlogPosts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-blog-posts',
  templateUrl: 'blog-posts.html'
})
export class BlogPostsPage {

  id: any;
  item: any;
	posts: any;
	
  constructor(public nav: NavController, public params: NavParams, public wpService: WpService) {
  	this.id = params.data;

  	this.wpService.getPosts(this.id)
  	.then((results) => this.posts = results);
  }

	getPost(id){
	  this.nav.push('BlogPostPage', id)
  }

}
