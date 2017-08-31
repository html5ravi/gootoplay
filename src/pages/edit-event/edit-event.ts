import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import {EventItem} from '../../models/event-item/event-item.interface';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'page-edit-event',
  templateUrl: 'edit-event.html',
})
export class EditEventPage {

  public eventItemSubscription:Subscription;
  eventItem = {} as EventItem;
  eventItemRef$: FirebaseObjectObservable<EventItem>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private database:AngularFireDatabase,public toastCtrl: ToastController) {
    const eventId = this.navParams.get('eventId');
    this.eventItemRef$ = this.database.object(`Event-List/${eventId}`);
    this.eventItemSubscription = this.eventItemRef$.subscribe(data => this.eventItem = data);
  }
  
  UpdateEvent(eventItem:EventItem){
    this.eventItemRef$.update(eventItem);
    this.navCtrl.pop();
    let toast = this.toastCtrl.create({
      message: 'Event Updated successfully',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  ionViewWillLeave(){
    this.eventItemSubscription.unsubscribe();
  }

}
