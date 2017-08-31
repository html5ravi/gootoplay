import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EventItem,TournamentCatory, AgeCategory, MatchCategory, MatchType, ShuttleType, ShuttleBrand} from '../../models/event-item/event-item.interface';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
   
  public saveEventData:any = {};
  public contacts:any = [{mobile:"",name:""}];
  public prize:any =[{amount:"",name:""}];
  public category:any = {};
  public trophys:any ={};
  public tourneyCategorySave:any = {};
  public matchList:any =[];

  eventItem = {} as EventItem;
  
  eventItemRef$: FirebaseListObservable<EventItem[]>;
  tourneyCategory$: FirebaseListObservable<TournamentCatory[]>;
  ageCategory$: FirebaseListObservable<AgeCategory[]>;
  matchCategory$:FirebaseListObservable<MatchCategory[]>;
  matchType$:FirebaseListObservable<MatchType[]>;
  shuttleBrand$:FirebaseListObservable<ShuttleBrand[]>;
  shuttleType$:FirebaseListObservable<ShuttleType[]>;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private database:AngularFireDatabase) {
    this.eventItemRef$ = this.database.list('Event-List');
    this.tourneyCategory$ = this.database.list(`tourneyCategory`);
    this.ageCategory$ = this.database.list(`ageCategory`);
    this.matchCategory$ = this.database.list(`matchCategory`);
    this.matchType$ = this.database.list(`matchType`);
    this.shuttleBrand$ = this.database.list(`shuttleBrand`);
    this.shuttleType$ = this.database.list(`shuttleType`);
  }

  AddEvent(eventItem:EventItem){
    var date = new Date();
    this.eventItemRef$.push({
      created_at:date.toString(),
      contacts:this.contacts,
      general:this.saveEventData,
      trophy:this.trophys,
      matchList:this.matchList
    });
    //Making fields empty!
    this.eventItem= {} as EventItem;
    //Navigate to Event List page
    this.navCtrl.pop();
  }
  
  addContactField() {
    this.contacts.push({mobile:"",name:""});
  }
  removeContactField(array_index) {
    this.contacts.splice(array_index,1);
  }
  addPrizeField() {
      this.prize.push({name:"",amount:""});
  }
  removePrizeField(array_index) {
      this.prize.splice(array_index,1);
  }
  addCategory(obj) {
      obj.prize = this.prize;
      this.matchList.push(obj);
      this.category = {};
      this.prize = [{amount:"",name:""}];
      this.category.ageCategory = "";
      this.category.matchCategory = "";
      this.category.matchType = "";
      this.category.entryFee = null;
      //console.log(this.matchList)
  }
  removeCategory(array_index) {
      this.matchList.splice(array_index,1);
      //console.log(this.matchList)
  }
 
}
