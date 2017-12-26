import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Cart } from './cart';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    Cart,
  ],
  imports: [
    IonicPageModule.forChild(Cart),
    TranslateModule.forChild()
  ],
  exports: [
    Cart
  ]
})
export class CartModule {}
