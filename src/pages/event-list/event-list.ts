import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController,ModalController } from 'ionic-angular';
import {EventItem,FavItem} from '../../models/event-item/event-item.interface';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { EditEventPage} from '../edit-event/edit-event';
import {MyFav} from '../../models/myfav';
import { EventDetailsPage } from '../event-details/event-details';
import { SuperTabsController } from 'ionic2-super-tabs';      



@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  public isFavourite: boolean = false;
  myFav = {} as MyFav;
  myFavst : any = [];
  newList:any =[];
  
  public today = new Date().getTime();
  public getDate = new Date("2016-08-20").getTime(); 

  public currentUser:any = JSON.parse(localStorage.getItem("currentUser"));
  public myFavs:any = JSON.parse(localStorage.getItem("currentUserMyFavs"));
  public dummyArrs : any;
  eventListRef$: FirebaseListObservable<EventItem[]>
  eventFavRef$: FirebaseListObservable<FavItem[]>
  public oneObj:any;
  public twoObj:any =[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private database:AngularFireDatabase, 
    public actionsheetCtrl: ActionSheetController,
    public db:AngularFireDatabase,
    private superTabsCtrl: SuperTabsController,
    public modalCtrl: ModalController
    ) {
      
      
      if(this.getDate >= this.today){
        //console.log("upcoming")
      }else{
        //console.log("past")
      }

    //this.superTabsCtrl.showToolbar(true);
    this.eventListRef$ = this.database.list('Event-List');
    this.eventFavRef$ = this.database.list(`profile/${this.currentUser.uid}/myfavs/`);

    this.eventListRef$.subscribe(data=>{
      //console.log(data)
      this.newList = data;
       this.eventFavRef$.subscribe(data=>{
        //console.log(data)
        this.twoObj=data;
        for(let i=0;i<this.newList.length;i++){
          for(let j=0;j<this.twoObj.length;j++){
            if(this.newList[i].$key == this.twoObj[j].eventId){
              this.newList[i].favourite = true;
            }
          }
        }
      });
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
