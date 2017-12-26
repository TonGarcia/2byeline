import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBrand } from './add-brand';

@NgModule({
  declarations: [
    AddBrand,
  ],
  imports: [
    IonicPageModule.forChild(AddBrand),
  ],
  exports: [
    AddBrand
  ]
})
export class AddBrandModule {}
