import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventResultsPage } from './event-results';

@NgModule({
  declarations: [
    EventResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(EventResultsPage),
  ],
})
export class EventResultsPageModule {}
