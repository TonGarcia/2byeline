import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderList } from './order-list';

@NgModule({
  declarations: [
    OrderList,
  ],
  imports: [
    IonicPageModule.forChild(OrderList),
  ],
  exports: [
    OrderList
  ]
})
export class OrderListModule {}
