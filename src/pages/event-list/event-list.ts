import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddEventPage } from '../add-event/add-event';
import {EventItem} from '../../models/event-item/event-item.interface';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { EditEventPage} from '../edit-event/edit-event';




@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  eventListRef$: FirebaseListObservable<EventItem[]>
  constructor(public navCtrl: NavController, public navParams: NavParams, private database:AngularFireDatabase, public actionsheetCtrl: ActionSheetController) {
    this.eventListRef$ = this.database.list('Event-List');
  }

  goToaddEventPage(){
    this.navCtrl.push(AddEventPage);
  }

  openMenu(eventItem:EventItem) {
    let actionSheet = this.actionsheetCtrl.create({
      title: `${eventItem.eventName}`,
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            //console.log('Delete clicked');
            this.eventListRef$.remove(eventItem.$key);
          }
        },
        {
          text: 'Edit',
          handler: () => {
            this.navCtrl.push(EditEventPage,{eventId: eventItem.$key})
          }
        },
        /*{
          text: 'Play',
          handler: () => {
            console.log('Play clicked');
          }
        },*/
        {
          text: 'Favorite',
          handler: () => {
            //console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
 
}
