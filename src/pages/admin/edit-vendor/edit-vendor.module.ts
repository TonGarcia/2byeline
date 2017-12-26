import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditVendor } from './edit-vendor';

@NgModule({
  declarations: [
    EditVendor,
  ],
  imports: [
    IonicPageModule.forChild(EditVendor),
  ],
  exports: [
    EditVendor
  ]
})
export class EditVendorModule {}
