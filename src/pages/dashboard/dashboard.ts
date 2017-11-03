import { Component, ViewChild } from '@angular/core';
import {IonicPage, Platform, MenuController, Nav, App, ToastController,NavController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {FirebaseObjectObservable,AngularFireDatabase} from 'angularfire2/database';
import { WelcomePage } from '../welcome/welcome';
import { AddEventPage } from '../add-event/add-event';
import { DashboardHomePage } from '../dashboard-home/dashboard-home';
import { EventsPage } from '../events/events';
import { ProfilePage } from '../profile/profile';
import {User} from '../../models/user.models';
// import {Facebook } from '@ionic-native/facebook'; inauguraloffer bigbox10
//import { Firebase} from 'firebase';
import { VideoPage } from '../video/video';
import { ClubPage } from '../club/club';




@IonicPage()
@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  eventPage:any = EventsPage;
  videoPage:any = VideoPage;
  clubPage:any = ClubPage;
  profilePage:any=ProfilePage;
 @ViewChild(Nav) nav: Nav;
  //rootPages:any = EventsPage;
  pages: Array<{title: string, component: any, icons:string}>;
  public userData:FirebaseObjectObservable<User>;
  public photoURL:string;
  // firebaseUrl: string;
  //   ref: Firebase;
  subscription:any;
  constructor(
    public afAuth:AngularFireAuth,
    public toast:ToastController,
    public platform: Platform,
    public menu: MenuController,
    public app: App,
    // private facebook:Facebook,
    public db:AngularFireDatabase,
    public navCtrl: NavController,
  ) {
    // set our app's pages
    this.pages = [
      { title: 'Dashboard', component: DashboardHomePage, icons:'apps' },
      { title: 'Add Event', component: AddEventPage, icons:'add-circle' },
      { title: 'Profile', component: ProfilePage, icons:'person' }
    ];
    this.initializeApp();

    //get Profile Pic
    
  }
  
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);   
    
  }
  logout(){
        // Remove API token 
        this.afAuth.auth.signOut();
        localStorage.clear();
        this.navCtrl.push(WelcomePage);
        
  };
  
  //For Device back button prevention
  initializeApp() {
      this.platform.registerBackButtonAction(() => {
        let navv = this.app.getActiveNav();
        if (navv.canGoBack()){
          navv.pop();
        }else{
          this.platform.exitApp();
        }
      });
  }
}
