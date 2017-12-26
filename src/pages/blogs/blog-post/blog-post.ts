import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { WpService } from '../../../providers/wp-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Functions } from '../../../providers/functions/functions';


/*
  Generated class for the BlogPost page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-blog-post',
  templateUrl: 'blog-post.html'
})
export class BlogPostPage {
	
	id: any;
  post: any;
  form: any;
  status: any;

  constructor(public navCtrl: NavController, public params: NavParams, public wpService: WpService, public functions: Functions, private socialSharing: SocialSharing) {
  	
  	this.id = params.data; 
    this.form = []; 

  	this.wpService.getPost(this.id)
    .then((results) => this.post = results);

    this.post = {"status":"ok","post":{"id":1,"type":"post","slug":"hello-world","url":"http:\/\/130.211.141.170\/wp-content\/2016\/11\/05\/hello-world\/","status":"publish","title":"Hello world!","title_plain":"Hello world!","content":"<div style=\"width: 640px; \" class=\"wp-video\"><!--[if lt IE 9]><script>document.createElement('video');<\/script><![endif]-->\n<video class=\"wp-video-shortcode\" id=\"video-1-1\" width=\"640\" height=\"360\" preload=\"metadata\" controls=\"controls\"><source type=\"video\/mp4\" src=\"http:\/\/104.155.150.212\/wp-content\/wp-content\/uploads\/2016\/11\/Earthquake-in-Nepal-2015-Nepali-News-Mast.Video_.mp4?_=1\" \/><a href=\"http:\/\/104.155.150.212\/wp-content\/wp-content\/uploads\/2016\/11\/Earthquake-in-Nepal-2015-Nepali-News-Mast.Video_.mp4\">http:\/\/104.155.150.212\/wp-content\/wp-content\/uploads\/2016\/11\/Earthquake-in-Nepal-2015-Nepali-News-Mast.Video_.mp4<\/a><\/video><\/div>\n","excerpt":"","date":"2016-11-05 11:52:44","modified":"2016-11-16 06:30:09","categories":[{"id":4,"slug":"music","title":"Music","description":"","parent":0,"post_count":19},{"id":7,"slug":"page5","title":"Videos","description":"","parent":0,"post_count":17}],"tags":[],"author":{"id":1,"slug":"admin","name":"Insaan","first_name":"Insaan","last_name":"","nickname":"Insaan","url":"","description":"","image":"<img src=\"http:\/\/130.211.141.170\/wp-content\/wp-content\/uploads\/avatars\/1\/583ad803bf02a-bpfull.jpg\" class=\"avatar user-1-avatar avatar-128 photo\" width=\"128\" height=\"128\" alt=\"Profile photo of Insaan\" \/>"},"comments":[{"id":1,"name":"A WordPress Commenter","url":"https:\/\/wordpress.org\/","date":"2016-11-05 11:52:44","content":"<p>Hi, this is a comment.<br \/>\nTo get started with moderating, editing, and deleting comments, please visit the Comments screen in the dashboard.<br \/>\nCommenter avatars come from <a href=\"https:\/\/gravatar.com\">Gravatar<\/a>.<\/p>\n","parent":0,"image":"<img alt='' src='http:\/\/1.gravatar.com\/avatar\/d7a973c7dab26985da5f961be7b74480?s=128&#038;d=mm&#038;r=g' srcset='http:\/\/1.gravatar.com\/avatar\/d7a973c7dab26985da5f961be7b74480?s=256&amp;d=mm&amp;r=g 2x' class='avatar avatar-128 photo' height='128' width='128' \/>"}],"attachments":[{"id":28,"url":"http:\/\/104.155.150.212\/wp-content\/wp-content\/uploads\/2016\/11\/SampleVideo_1280x720_1mb.mp4","slug":"samplevideo_1280x720_1mb","title":"samplevideo_1280x720_1mb","description":"","caption":"","parent":1,"mime_type":"video\/mp4"},{"id":37,"url":"http:\/\/104.155.150.212\/wp-content\/wp-content\/uploads\/2016\/11\/Earthquake-in-Nepal-2015-Nepali-News-Mast.Video_.mp4","slug":"earthquake-in-nepal-2015-nepali-news-mast-video","title":"","description":"","caption":"","parent":1,"mime_type":"video\/mp4"}],"comment_count":1,"comment_status":"open","custom_fields":{"enclosure":["http:\/\/104.155.150.212\/wp-content\/wp-content\/uploads\/2016\/11\/Earthquake-in-Nepal-2015-Nepali-News-Mast.Video_.mp4\n7957668\nvideo\/mp4\n"]}},"next_url":"http:\/\/130.211.141.170\/wp-content\/2016\/11\/08\/multiple-paragraph-post\/"};
  }


  submit(){
    if(this.validateForm()){
       this.form.post_id = this.id;
         
       this.wpService.submitComment(this.form)
       .then((results) => this.handleResults(results));
    }
  }


  handleResults(results){
    console.log(results);
    if(!results.error){
       this.status = results;
       this.functions.showAlert('success', 'You have successfully submit');

       this.form.comment = "";
       this.form.name = "";
       this.form.email = "";
    }

    else if(results.error){
      this.functions.showAlert('error', 'invalid username/password');
    }
  }

  
  validateForm(){
    if(this.form.comment == undefined || this.form.comment == ""){this.functions.showAlert("Error", "Please Enter Content"); return false}
    // if(this.form.name == undefined || this.form.name == ""){this.functions.showAlert("Error", "Please Enter Name"); return false}
    // if(this.form.email == undefined || this.form.email == ""){this.functions.showAlert("Error", "Please Enter Email"); return false}
    return true;
  }

 share(post){
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    var options = {
      message: 'share this', // not supported on some apps (Facebook, Instagram)
      subject: post.title, // fi. for email
      files: ['', ''], // an array of filenames either locally or remotely
      url: post.url,
      chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
    }

    this.socialSharing.shareWithOptions(options);
  }

  shareWithFb(post){
    this.socialSharing.shareViaFacebook('Share this', post.thumbnail, post.url);
  }

   shareWithTw(post){
    this.socialSharing.shareViaTwitter('Share this', post.thumbnail, post.url);
  }

   shareWithInstagram(post){
    this.socialSharing.shareViaInstagram(post.thumbnail, post.url);
  }

   shareWithWhatsapp(post){
    this.socialSharing.shareViaWhatsApp('Share this', post.thumbnail, post.url);
  }

    
  
}
