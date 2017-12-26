import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditCustomerPage } from './edit-customer';

@NgModule({
  declarations: [
    EditCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(EditCustomerPage),
  ],
  exports: [
    EditCustomerPage
  ]
})
export class EditCustomerPageModule {}
