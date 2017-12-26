import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogPostPage } from './blog-post';
//import  { KeysPipe } from '../providers/pipes/pipe';
import { KeysPipeModule } from '../../../providers/pipes/pipe.module'

@NgModule({
  declarations: [
    BlogPostPage,
  ],
  imports: [
  	KeysPipeModule,
    IonicPageModule.forChild(BlogPostPage),
  ],
  exports: [
    BlogPostPage
  ]
})
export class BlogPostPageModule {}
