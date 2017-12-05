import { Component } from '@angular/core';
import { NavController, NavParams,ModalController,ActionSheetController } from 'ionic-angular';
import {EventItem,FavItem} from '../../../models/event-item/event-item.interface';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {MyFav} from '../../../models/myfav';
import { EventDetailsPage } from '../../event-details/event-details';
import { SuperTabsController } from 'ionic2-super-tabs';      
import { DatabaseProvider } from '../../../providers/database';      


@Component({
  selector: 'page-pastevent',
  templateUrl: 'pastevent.html',
})
export class PastEventPage {
public isFavourite: boolean = false;
  myFav = {} as MyFav;
  
  eventObj:any = [];
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
    public modalCtrl: ModalController,
    private data:DatabaseProvider
    ) {
      
      
      this.data.renderEvents().then(data=>{
        console.log(data)
        this.eventObj = data;
      })
      //console.log

    //this.superTabsCtrl.showToolbar(true);
    this.eventListRef$ = this.database.list('Event-List');
    this.eventFavRef$ = this.database.list(`profile/${this.currentUser.uid}/myfavs/`);

    // this.eventListRef$.subscribe(data=>{
    //   //console.log(data)
    //   this.newList = data;
    //    this.eventFavRef$.subscribe(data=>{
    //     //console.log(data)
    //     this.twoObj=data;
    //     for(let i=0;i<this.newList.length;i++){
    //       for(let j=0;j<this.twoObj.length;j++){
    //         if(this.newList[i].$key == this.twoObj[j].eventId){
    //           this.newList[i].favourite = true;
    //         }
    //       }
    //     }
    //   });
    // });
   
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


}
