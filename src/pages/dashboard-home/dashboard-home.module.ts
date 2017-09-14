import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardHomePage } from './dashboard-home';

@NgModule({
  declarations: [
    DashboardHomePage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardHomePage),
  ],
})
export class DashboardHomePageModule {}
