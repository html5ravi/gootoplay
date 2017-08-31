import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';

// import { DashboardIonic } from '../pages/dashboard-ionic/dashboard-ionic';
import { AddEventPage } from '../add-event/add-event';
import { EventListPage } from '../event-list/event-list';



@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
 @ViewChild(Nav) nav: Nav;
  rootPages:any = EventListPage;
  pages: Array<{title: string, component: any, icons:string}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    // set our app's pages
    this.pages = [
      { title: 'Dashboard', component: EventListPage, icons:'apps' },
      { title: 'Add Event', component: AddEventPage, icons:'add-circle' }
    ];
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
