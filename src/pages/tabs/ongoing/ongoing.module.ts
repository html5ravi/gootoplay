import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OngoingPage } from './ongoing';

@NgModule({
  declarations: [
    OngoingPage,
  ],
  imports: [
    IonicPageModule.forChild(OngoingPage),
  ],
})
export class OngoingPageModule {}
