import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';
import { AddEventPage } from '../add-event/add-event';
import { EventListPage } from '../event-list/event-list';
import {EventItem} from '../../models/event-item/event-item.interface';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { Tab1Page } from '../tabs/tab1/tab1';
import { Tab2Page } from '../tabs/tab2/tab2';
import { Tab3Page } from '../tabs/tab3/tab3';

@Component({
  selector: 'page-dashboard-home',
  templateUrl: 'dashboard-home.html',
})
export class DashboardHomePage {
  page1: any = EventListPage;
  page2: any = Tab2Page;
  page3: any = Tab3Page;
  public eventLength:number;
  eventListRef$: FirebaseListObservable<EventItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database:AngularFireDatabase,
    private superTabsCtrl: SuperTabsController) {
      this.eventListRef$ = this.database.list('Event-List');
      //alert(this.eventListRef$)
      this.eventListRef$.subscribe(data =>{
        this.eventLength = data.length;
        this.superTabsCtrl.setBadge('homeTab', this.eventLength);
      });
  }

  goToaddEventPage(){
    this.navCtrl.push(AddEventPage);
  }

  ionViewDidLoad() {
    
  }
  //For Super Tabs
 
  
  hideToolbar() {
    this.superTabsCtrl.showToolbar(false);
  }
  
  showToolbar() {
    this.superTabsCtrl.showToolbar(true);
  }
  
  onTabSelect(ev: any) {
    //console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
  }

}
