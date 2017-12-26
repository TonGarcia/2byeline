import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandList } from './brand-list';

@NgModule({
  declarations: [
    BrandList,
  ],
  imports: [
    IonicPageModule.forChild(BrandList),
  ],
  exports: [
    BrandList
  ]
})
export class BrandListModule {}
