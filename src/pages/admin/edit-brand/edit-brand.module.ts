import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditBrand } from './edit-brand';

@NgModule({
  declarations: [
    EditBrand,
  ],
  imports: [
    IonicPageModule.forChild(EditBrand),
  ],
  exports: [
    EditBrand
  ]
})
export class EditBrandModule {}
