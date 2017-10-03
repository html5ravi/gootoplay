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
  constructor(public navCtrl: NavController, public navParams: NavParams,public db:AngularFireDatabase,private viewCtrl:ViewController,private share: SocialSharing, private ss:Screenshot) {
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
    //let message="Test message", subject="Badminton Event", file="assets/img/profile.jpg", url="http://www.gootoplay.com";
    // this.share.share('message', 'subject', 'assets/img/profile.jpg', 'http://www.gootoplay.com').then(data =>{
    //   console.log("success"+data)
    // }).catch(() => {
    //   console.log("error")
    // });
    console.log("working")
    this.ss.save('jpg', 80, 'myscreenshot.jpg').then((data)=>{
      console.log(data.filePath)
      this.screen = data.filePath;
      this.share.shareViaWhatsApp(obj.general.title,'http://rootaccez.com/assets/team/ravi.jpg',null).then(data=>{ }).catch(error=>{ });
      this.reset();
    });


    
  }

  ionViewDidLoad() {
    //this.superTabsCtrl.showToolbar(false)
  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }

}
