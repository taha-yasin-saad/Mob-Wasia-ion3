import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyWillPage } from './my-will';

@NgModule({
  declarations: [
    MyWillPage,
  ],
  imports: [
    IonicPageModule.forChild(MyWillPage),
  ],
})
export class MyWillPageModule {}
