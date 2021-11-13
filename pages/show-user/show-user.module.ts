import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowUserPage } from './show-user';

@NgModule({
  declarations: [
    ShowUserPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowUserPage),
  ],
})
export class ShowUserPageModule {}
