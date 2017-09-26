import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';
import {AngularFireDatabase } from 'angularfire2/database';
// import {EventItem} from '../../models/event-item/event-item.interface';
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {

  
   public eventListRef$:any;
   public eventObj:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public db:AngularFireDatabase,private viewCtrl:ViewController) {
    let eventId = navParams.get('eventId');
    this.eventListRef$ = this.db.object(`Event-List/${eventId}`);
    this.eventListRef$.subscribe(data=>{
      this.eventObj = data;
      console.log(data);
    });    
  }

  ionViewDidLoad() {
    //this.superTabsCtrl.showToolbar(false)
  }

  dismissModal(){

    this.viewCtrl.dismiss();
  }

}
