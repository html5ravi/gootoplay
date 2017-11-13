import { Component } from '@angular/core';
import { NavController,IonicPage, NavParams } from 'ionic-angular';
import {EventItem,TournamentCatory, AgeCategory, MatchCategory, MatchType, ShuttleType, ShuttleBrand, Terms} from '../../models/event-item/event-item.interface';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
// import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  public currentDate: string = new Date().toLocaleDateString();


  public saveEventData:any = {};
  public contacts:any = [{mobile:"",name:""}];
  public prize:any =[{amount:"",name:""}];
  public category:any = {};
  public trophys:any ={};
  public tourneyCategorySave:any = {};
  public matchList:any =[];
  public uid: any;
  public terms:any=[];
  eventItem = {} as EventItem;
  
  eventItemRef$: FirebaseListObservable<EventItem[]>;
  tourneyCategory$: FirebaseListObservable<TournamentCatory[]>;
  ageCategory$: FirebaseListObservable<AgeCategory[]>;
  matchCategory$:FirebaseListObservable<MatchCategory[]>;
  matchType$:FirebaseListObservable<MatchType[]>;
  shuttleBrand$:FirebaseListObservable<ShuttleBrand[]>;
  shuttleType$:FirebaseListObservable<ShuttleType[]>;
  terms$:FirebaseListObservable<Terms[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database:AngularFireDatabase,public afauth:AngularFireAuth) {
    this.eventItemRef$ = this.database.list('Event-List');
    this.tourneyCategory$ = this.database.list(`tourneyCategory`);
    this.ageCategory$ = this.database.list(`ageCategory`);
    this.matchCategory$ = this.database.list(`matchCategory`);
    this.matchType$ = this.database.list(`matchType`);
    this.shuttleBrand$ = this.database.list(`shuttleBrand`);
    this.shuttleType$ = this.database.list(`shuttleType`);
    this.terms$ = this.database.list(`Terms`);

    this.afauth.authState.take(1).subscribe(data => {
      this.uid = data.uid;
    });
    
    this.saveEventData.startdate=this.currentDate;
    console.log(this.terms$)
  }

  

  AddEvent(eventItem:EventItem){
    var date = new Date();
    if(this.uid){
      this.eventItemRef$.push({
        favourite:false,
        created_at:date.toString(),
        userId:this.uid,
        contacts:this.contacts,
        general:this.saveEventData,
        trophy:this.trophys,
        matchList:this.matchList,
        terms:this.terms
      });
    }
    console.log(this.terms);
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
      obj.eventType = this.tourneyCategorySave.eventType;
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
