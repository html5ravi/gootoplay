import { Component } from '@angular/core';
import { Nav,IonicPage, NavParams } from 'ionic-angular';
import {EventItem,TournamentCatory, AgeCategory, MatchCategory, MatchType, ShuttleType, ShuttleBrand, Terms} from '../../models/event-item/event-item.interface';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import { DashboardPage } from '../dashboard/dashboard';
import { DatabaseProvider } from '../../providers/database';
import { Camera, CameraOptions} from '@ionic-native/camera';
// import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { storage} from 'firebase';
@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  public currentDate: string = new Date().toLocaleDateString();

  public currentUser:any = JSON.parse(localStorage.getItem("currentUser"));
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

  public photoURL:string;
  public imageLoaded:boolean = false;
  
  eventItemRef$: FirebaseListObservable<EventItem[]>;
  tourneyCategory$: FirebaseListObservable<TournamentCatory[]>;
  ageCategory$: FirebaseListObservable<AgeCategory[]>;
  matchCategory$:FirebaseListObservable<MatchCategory[]>;
  matchType$:FirebaseListObservable<MatchType[]>;
  shuttleBrand$:FirebaseListObservable<ShuttleBrand[]>;
  shuttleType$:FirebaseListObservable<ShuttleType[]>;
  terms$:FirebaseListObservable<Terms[]>;
  stateItem:any = [];
  cityItem:any = [];
  city:any;
  banner:string;
  constructor(public dbp:DatabaseProvider, public navCtrl: Nav, public navParams: NavParams, private database:AngularFireDatabase,public afauth:AngularFireAuth, public camera:Camera) {
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
    
    this.dbp.getState().then((data)=>{
      this.stateItem= data;
    });
    this.dbp.getCity().then((data)=>{
      this.cityItem= data;
    });

    const photo = storage().ref().child(`users/${this.currentUser.uid}`);     
     photo.getDownloadURL().then(data=> {
        this.photoURL = data;
        this.imageLoaded = true;
      }).catch(()=>{
        this.imageLoaded = true;
      })
    
  }

  
  async takePhoto(){
    try{
      const cameraOptions : CameraOptions = {
             //sourceType         : this.camera.PictureSourceType.PHOTOLIBRARY,
             destinationType    : this.camera.DestinationType.DATA_URL,
             quality            : 100,
             targetWidth        : 320,
             targetHeight       : 240,
             encodingType       : this.camera.EncodingType.JPEG,
             correctOrientation : true,
             mediaType:this.camera.MediaType.PICTURE
         };
      const result = await this.camera.getPicture(cameraOptions);
      const img = `data:image/jpeg;base64,${result}`;
      const pics = storage().ref(`users/${this.currentUser.uid}`);
      pics.putString(img,'data_url');
           
      storage().ref().child(`users/${this.currentUser.uid}`).getDownloadURL().then(url=> {
        this.database.object(`profile/${this.currentUser.uid}/user/url/`).set({'photoURL':url});
      });
           
     
    }
    catch(e){
      console.error(e);
    }
  }


  selectState(id){
   this.city = this.cityItem.filter((item)=> item.state_id == id);
  }

  AddEvent(eventItem:EventItem){
    var date = new Date();
    let addObj= {
        favourite:false,
        created_at:date.toString(),
        userId:this.uid,
        contacts:this.contacts,
        general:this.saveEventData,
        trophy:this.trophys,
        matchList:this.matchList,
        terms:this.terms
      };
    if(this.uid){
      this.dbp.addToDatabase(addObj).then((data)=>{
        this.eventItem= {} as EventItem;
        //Navigate to Event List page
        this.navCtrl.setRoot(DashboardPage);    
      })
      // this.eventItemRef$.push({
      //   favourite:false,
      //   created_at:date.toString(),
      //   userId:this.uid,
      //   contacts:this.contacts,
      //   general:this.saveEventData,
      //   trophy:this.trophys,
      //   matchList:this.matchList,
      //   terms:this.terms
      // }).then((data)=>{
      //   this.eventItem= {} as EventItem;
      //   //Navigate to Event List page
      //   this.navCtrl.setRoot(DashboardPage);    
      // })
    }
    //console.log(this.terms);
    //Making fields empty!    
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
