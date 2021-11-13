import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WitnesesPage } from './witneses';

@NgModule({
  declarations: [
    WitnesesPage,
  ],
  imports: [
    IonicPageModule.forChild(WitnesesPage),
  ],
})
export class WitnesesPageModule {}
