import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WillsPage } from './wills';

@NgModule({
  declarations: [
    WillsPage,
  ],
  imports: [
    IonicPageModule.forChild(WillsPage),
  ],
})
export class WillsPageModule {}
