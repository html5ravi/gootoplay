import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Nav,MenuController } from 'ionic-angular';

import { AddEventPage } from '../add-event/add-event';
import { DashboardHomePage } from '../dashboard-home/dashboard-home';
import { ProfilePage } from '../profile/profile';
import { SuperTabsController } from 'ionic2-super-tabs';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  rootPages:any = DashboardHomePage;
  pages: Array<{title: string, component: any, icons:string}>;
  @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,private superTabsCtrl: SuperTabsController) {
     this.pages = [
      { title: 'Dashboard', component: DashboardHomePage, icons:'apps' },
      { title: 'AddEvent', component: AddEventPage, icons:'add-circle' },
      { title: 'Profile', component: ProfilePage, icons:'person' }
    ];
    
  }
  openPage(page) {
    console.log(page)
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    
    if((page.title=="Profile") || (page.title="AddEvent")){
      this.nav.setRoot(page.component);
      this.superTabsCtrl.showToolbar(false);
    } else{
      this.nav.setRoot(page.component);
      this.superTabsCtrl.showToolbar(true);
    }
    
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad EventsPage');
  }

}
