import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddVendor } from './add-vendor';

@NgModule({
  declarations: [
    AddVendor,
  ],
  imports: [
    IonicPageModule.forChild(AddVendor),
  ],
  exports: [
    AddVendor
  ]
})
export class AddVendorModule {}
