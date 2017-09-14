import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {EventItem,FavItem} from '../../../models/event-item/event-item.interface';

@Component({
  selector: 'page-tab3',
  templateUrl: 'tab3.html',
})
export class Tab3Page {
  public eventIds:any;
  public currentUser:any = JSON.parse(localStorage.getItem("currentUser"));
  eventListRef$: FirebaseListObservable<EventItem[]>
  eventFavRef$: FirebaseListObservable<FavItem[]>
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private db:AngularFireDatabase, 
  ) {
    this.eventListRef$ = this.db.list('Event-List');
    this.eventFavRef$ = this.db.list(`profile/${this.currentUser.uid}/myfavs/`);
    this.eventFavRef$.subscribe(data=>{
      this.eventIds = data;
      console.log(this.eventIds)
    })
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Tab3Page');
  }

}
