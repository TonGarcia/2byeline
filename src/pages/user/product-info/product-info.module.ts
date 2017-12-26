import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductInfoPage } from './product-info';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductInfoPage),
    TranslateModule
  ],
  exports: [
    ProductInfoPage
  ]
})
export class ProductInfoPageModule {}
