import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';

@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private superTabsCtrl:SuperTabsController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailsPage');
    this.superTabsCtrl.showToolbar(false);
  }

}
