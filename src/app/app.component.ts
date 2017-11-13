import { Component,ViewChild } from '@angular/core';
import { Platform,Nav, AlertController,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ProfilePage } from '../pages/profile/profile';
import { AddEventPage } from '../pages/add-event/add-event';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import {Network} from '@ionic-native/network';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav:Nav;
  //public rootPage:any;
pages: Array<{title: string, component: any, icons:string}>;
  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public screenOrientation: ScreenOrientation,
    private network:Network,
    private alert:AlertController,
    public menu: MenuController,
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.initializeApp();
    this.pages = [
      { title: 'Dashboard', component: DashboardPage, icons:'apps' },
      { title: 'Add Event', component: AddEventPage, icons:'add-circle' },
      { title: 'Profile', component: ProfilePage, icons:'person' }
    ];
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
    openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);   
    
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

