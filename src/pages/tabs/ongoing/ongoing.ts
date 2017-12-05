import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController,ModalController } from 'ionic-angular';
import {EventItem,FavItem} from '../../../models/event-item/event-item.interface';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { EditEventPage} from '../../../edit-event/edit-event';
import {MyFav} from '../../../models/myfav';
import { EventDetailsPage } from '../../event-details/event-details';
import { SuperTabsController } from 'ionic2-super-tabs';      
import { DatabaseProvider } from '../../../providers/database';


@Component({
  selector: 'page-ongoing',
  templateUrl: 'ongoing.html',
})
export class OngoingPage {

  public isFavourite: boolean = false;
  myFav = {} as MyFav;
  eventObj:any = [];
  public today = new Date().getTime();
  public getDate = new Date("2016-08-20").getTime(); 

  public currentUser:any = JSON.parse(localStorage.getItem("currentUser"));
  public myFavs:any = JSON.parse(localStorage.getItem("currentUserMyFavs"));
  
  eventListRef$: FirebaseListObservable<EventItem[]>
  eventFavRef$: FirebaseListObservable<FavItem[]>
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private database:AngularFireDatabase, 
    public actionsheetCtrl: ActionSheetController,
    public db:AngularFireDatabase,
    private superTabsCtrl: SuperTabsController,
    public modalCtrl: ModalController,
    private data:DatabaseProvider
    ) {
      
      this.data.renderEvents().then(data=>{
        this.eventObj = data;
      });
  }



ongoingEvent(dates){
  let todayDate = new Date().toISOString().slice(0,10);
  if(todayDate == dates){
    return true;
  }else{
    return false;
  }  
};


  isFavouriteFun(item){    
    item.favourite = !item.favourite;
      if(item.favourite){
        this.db.object(`profile/${this.currentUser.uid}/myfavs/${item.$key}/`).set({"eventId":item.$key});        
      }else{
        this.db.list(`profile/${this.currentUser.uid}/myfavs`).remove(item.$key);
      }        
  }
  goToEventDetails(eventItem:EventItem){
    let modal = this.modalCtrl.create(EventDetailsPage,{eventId: eventItem.$key});
    modal.present();
  }
 
}
