import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrandProductsPage } from './brand-products';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BrandProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(BrandProductsPage),
    TranslateModule.forChild()
  ],
  exports: [
    BrandProductsPage
  ]
})
export class BrandProductsPageModule {}
