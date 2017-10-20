import { Component,ViewChild } from '@angular/core';
import { Platform,Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import {Network} from '@ionic-native/network';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav:Nav;
  //public rootPage:any;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public screenOrientation: ScreenOrientation,
    private network:Network,
    private alert:AlertController
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.initializeApp();
  }
  ionViewDidLoad() {
    alert("working")
    this.network.onConnect().subscribe(res=>{
      //console.log(res);
      this.networkStatus(res.type);
    });
    this.network.onDisconnect().subscribe(res=>{
      //console.log(res);
      this.networkStatus(res.type);
    });
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      let user = JSON.parse(localStorage.getItem("currentUser")) || {};
      if(user.uid){
        this.nav.setRoot(DashboardPage);
      }else{
         this.nav.setRoot(WelcomePage);
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      
    });
  }

  networkStatus(status:String){
    this.alert.create({
      message:`Inernet connection is now ${status}. Please try again!`,
      enableBackdropDismiss: false,
      title: 'Confirm',
      cssClass: 'networkAlert',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'cancelAlertBtn'
      },
      {
        text: 'Exit',
        cssClass: 'exitAlertBtn',
        handler: () => {
          this.platform.exitApp();
        }
      }]
    }).present();
  }

 

}

