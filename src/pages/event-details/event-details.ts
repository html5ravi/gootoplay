import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';
import {AngularFireDatabase } from 'angularfire2/database';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';


@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {
  
  screen:any;
  state:boolean =false;
   public eventListRef$:any;
   public eventObj:any;
   public getScreenShot:any;
   public option:any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,public db:AngularFireDatabase,private viewCtrl:ViewController,private shared: SocialSharing, private ss:Screenshot) {
    let eventId = navParams.get('eventId');
    this.eventListRef$ = this.db.object(`Event-List/${eventId}`);
    this.eventListRef$.subscribe(data=>{
      this.eventObj = data;
      //console.log(data);
    });
  }

  reset(){
    var self = this;
    setTimeout(function(){
      self.state = false;
    },1000);
  };

  doShare(obj){
    this.ss.URI(80).then((res)=>{  
      const file = res.URI;  
      //localStorage.setItem("tempBase64",res.URI);
      this.option.message = 'Badminton Event: ' + obj.general.title+" on: "+ obj.general.startdate;
      this.option.subject = 'Badminton Event';
      this.option.file = file;
      this.option.url = "gootoplay.com";
      this.shared.share(this.option.message,this.option.subject,this.option.file,this.option.url); 
      this.reset();
    }).catch((error)=>{
      console.error(error);
    })
  };

  ionViewDidLoad() {
    //this.superTabsCtrl.showToolbar(false)
  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }

}
