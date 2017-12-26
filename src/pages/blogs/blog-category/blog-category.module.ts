import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogCategoryPage } from './blog-category';

@NgModule({
  declarations: [
    BlogCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(BlogCategoryPage),
  ],
  exports: [
    BlogCategoryPage
  ]
})
export class BlogCategoryPageModule {}
