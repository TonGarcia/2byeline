import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogPostsPage } from './blog-posts';
import { KeysPipeModule } from '../../../providers/pipes/pipe.module'

@NgModule({
  declarations: [
    BlogPostsPage,
  ],
  imports: [
  	KeysPipeModule,
    IonicPageModule.forChild(BlogPostsPage),
  ],
  exports: [
    BlogPostsPage
  ]
})
export class BlogPostsPageModule {}
