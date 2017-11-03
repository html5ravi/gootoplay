import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,Platform,ToastController } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';
import { AddEventPage } from '../add-event/add-event';
import { EventListPage } from '../event-list/event-list';
import {EventItem} from '../../models/event-item/event-item.interface';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
// import { Tab1Page } from '../tabs/tab1/tab1';
import { Tab2Page } from '../tabs/tab2/tab2';
import { Tab3Page } from '../tabs/tab3/tab3';
import {Network} from '@ionic-native/network';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from '../../models/user.models';


@Component({
  selector: 'page-dashboard-home',
  templateUrl: 'dashboard-home.html',
})
export class DashboardHomePage {
  page1: any = EventListPage;
  page2: any = Tab2Page;
  page3: any = Tab3Page;

  
  eventLength:number;
  eventListRef$: FirebaseListObservable<EventItem[]>
  subscription:any;
  public userData:FirebaseObjectObservable<User>;;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database:AngularFireDatabase,
    private network:Network,
    public platform: Platform, 
    private alert:AlertController,
    public afAuth:AngularFireAuth,
    public toast:ToastController,
    public db:AngularFireDatabase,
    private superTabsCtrl: SuperTabsController) {
      this.eventListRef$ = this.database.list('Event-List');
      //alert(this.eventListRef$)
      this.eventListRef$.subscribe(data =>{
        this.eventLength = data.length;
        //this.superTabsCtrl.setBadge('homeTab', this.eventLength);
      });

      /** START */
      this.subscription = this.afAuth.authState.subscribe(data=>{
      //console.log(data);
      if(data && data.email && data.uid){
        localStorage.setItem("currentUser",JSON.stringify(data));
        this.userData = this.db.object(`profile/${data.uid}/user`);
        //console.log(this.userData);        
        this.db.object(`profile/${data.uid}/myfavs`).subscribe(data=>{
          localStorage.setItem("currentUserMyFavs",JSON.stringify(data));
        });
      //  this.toast.create({
      //     message:'Welcome to Gootoplay Events',
      //     duration:3000
      //   }).present();
      }
      else{
        this.toast.create({
          message:`Could not find authentication details!`,
          duration:3000
        }).present();
      }
    })
      /**  END */
  }

  goToaddEventPage(){
    this.navCtrl.push(AddEventPage);
  }

  ionViewDidLoad() {
    // this.network.onConnect().subscribe(res=>{
    //   //console.log(res);
    //   this.networkStatus(res.type);
    // });
    this.network.onDisconnect().subscribe(res=>{
      //console.log(res);
      this.networkStatus(res.type);
    });
  }
  networkStatus(status:String){
    this.alert.create({
      message:`Inernet connection is ${status}. Please connect internet then try!`,
      enableBackdropDismiss: false,
      title: 'Confirm',
      cssClass: 'networkAlert',
      buttons: [{
        text: 'Ok',
        role: 'cancel',
        cssClass: 'cancelAlertBtn'
      }]
    }).present();
  }
 
  //For Super Tabs
 
  
  hideToolbar() {
    this.superTabsCtrl.showToolbar(false);
  }
  
  showToolbar() {
    this.superTabsCtrl.showToolbar(true);
  }
  
  onTabSelect(ev: any) {
    //console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
}



}
