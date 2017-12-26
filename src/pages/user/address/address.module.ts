import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Address } from './address';

@NgModule({
  declarations: [
    Address,
  ],
  imports: [
    IonicPageModule.forChild(Address),
  ],
  exports: [
    Address
  ]
})
export class AddressModule {}
