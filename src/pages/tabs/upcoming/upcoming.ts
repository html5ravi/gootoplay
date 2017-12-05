import { Component } from '@angular/core';
import { NavController, NavParams,ModalController, ActionSheetController } from 'ionic-angular';
import {EventItem,FavItem} from '../../../models/event-item/event-item.interface';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {MyFav} from '../../../models/myfav';
import { EventDetailsPage } from '../../event-details/event-details';
import { SuperTabsController } from 'ionic2-super-tabs';      
import { DatabaseProvider } from '../../../providers/database';    


@Component({
  selector: 'page-upcoming',
  templateUrl: 'upcoming.html',
})
export class UpcomingPage {
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
        console.log(data)
        this.eventObj = data;
      });
  }

upcomingEvent(dates){
  let item = new Date(dates).getTime();
  if(item >= this.today){
    return true;
  }else{
    return false;
  }  
};
pastEvent(dates){
  let item = new Date(dates).getTime();
  if(item <= this.today){
    return true;
  }else{
    return false;
  }  
};

ionViewDidLoad() {
    //console.log('ionViewDidLoad EventDetailsPage');
    this.superTabsCtrl.showToolbar(true);
  }
  

  isFavouriteFun(item){    
    item.favourite = !item.favourite;
      if(item.favourite){
        this.db.object(`profile/${this.currentUser.uid}/myfavs/${item.$key}/`).set({"eventId":item.$key});        
      }else{
        this.db.list(`profile/${this.currentUser.uid}/myfavs`).remove(item.$key);
      }        
  }
  goToEventDetails(eventItem:EventItem){
    //console.log(eventItem.$key)
    //this.navCtrl.push(EventDetailsPage,{eventId: eventItem.$key})
    let modal = this.modalCtrl.create(EventDetailsPage,{eventId: eventItem.$key});
    modal.present();
  }

  // openMenu(eventItem:EventItem) {
  //   let actionSheet = this.actionsheetCtrl.create({
  //     title: `${eventItem.eventName}`,
  //     cssClass: 'action-sheets-basic-page',
  //     buttons: [
  //       {
  //         text: 'Delete',
  //         role: 'destructive',
  //         handler: () => {
  //           //console.log('Delete clicked');
  //           this.eventListRef$.remove(eventItem.$key);
  //         }
  //       },
  //       {
  //         text: 'Edit',
  //         handler: () => {
  //           //this.navCtrl.push(EditEventPage,{eventId: eventItem.$key})
  //         }
  //       },
  //       {
  //         text: 'Favorite',
  //         handler: () => {
  //           //console.log('Favorite clicked');
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel', // will always sort to be on the bottom
  //         handler: () => {
  //           //console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }

}
