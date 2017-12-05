import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {EventItem,FavItem} from '../../../models/event-item/event-item.interface';
import {MyFav} from '../../../models/myfav';
import { EventDetailsPage } from '../../event-details/event-details';

@Component({
  selector: 'page-myevents',
  templateUrl: 'myevents.html',
})
export class MyeventsPage {
  public eventIds:any;
  public currentUser:any = JSON.parse(localStorage.getItem("currentUser"));
  eventListRef$: FirebaseListObservable<EventItem[]>
  eventFavRef$: FirebaseListObservable<FavItem[]>


  public isFavourite: boolean = false;
  myFav = {} as MyFav;
  myFavst : any = [];
  newList:any =[];
  public myFavs:any = JSON.parse(localStorage.getItem("currentUserMyFavs"));
  public dummyArrs : any;
  public oneObj:any;
  public twoObj:any =[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private db:AngularFireDatabase, 
    public modalCtrl: ModalController
  ) {
    this.eventListRef$ = this.db.list('Event-List');
    this.eventFavRef$ = this.db.list(`profile/${this.currentUser.uid}/myfavs/`);
    
    this.eventListRef$.subscribe(data=>{
      //console.log(data)
      this.newList = data;
       this.eventFavRef$.subscribe(data=>{
        //console.log(data)
        this.eventIds = data;
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

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Tab3Page');
  };
  isFavouriteFun(item){    
    item.favourite = !item.favourite;
      if(item.favourite){
        this.db.object(`profile/${this.currentUser.uid}/myfavs/${item.$key}/`).set({"eventId":item.$key});        
      }else{
        this.db.list(`profile/${this.currentUser.uid}/myfavs`).remove(item.$key);
      }        
  };
   goToEventDetails(eventItem:EventItem){
    console.log(eventItem.$key)
    //this.navCtrl.push(EventDetailsPage,{eventId: eventItem.$key})
    let modal = this.modalCtrl.create(EventDetailsPage,{eventId: eventItem.$key});
    modal.present();
  };
  

}
