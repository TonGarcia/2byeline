import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorList } from './vendor-list';

@NgModule({
  declarations: [
    VendorList,
  ],
  imports: [
    IonicPageModule.forChild(VendorList),
  ],
  exports: [
    VendorList
  ]
})
export class VendorListModule {}
