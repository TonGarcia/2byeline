import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { KeysPipeModule } from '../../../pipes/pipe.module'
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    KeysPipeModule,
    TranslateModule.forChild()
  ],
  exports: [
    SettingsPage
  ]
})
export class SettingsPageModule {}
