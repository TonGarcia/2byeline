import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetpassowrdPage } from './resetpassowrd';

@NgModule({
  declarations: [
    ResetpassowrdPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetpassowrdPage),
  ],
  exports: [
    ResetpassowrdPage
  ]
})
export class ResetpassowrdPageModule {}
