import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App, ToastController,NavController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {FirebaseObjectObservable,AngularFireDatabase} from 'angularfire2/database';
import { LoginPage } from '../login/login';
import { AddEventPage } from '../add-event/add-event';
import { DashboardHomePage } from '../dashboard-home/dashboard-home';
import { ProfilePage } from '../profile/profile';
import {User} from '../../models/user.models';
// import {Facebook } from '@ionic-native/facebook'; inauguraloffer bigbox10

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
 @ViewChild(Nav) nav: Nav;
  rootPages:any = DashboardHomePage;
  pages: Array<{title: string, component: any, icons:string}>;
  public userData:FirebaseObjectObservable<User>;;
  
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
    
  }
  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data=>{
      if(data && data.email && data.uid){
        localStorage.setItem("currentUser",JSON.stringify(data));
        this.userData = this.db.object(`profile/${data.uid}/user`);
        this.db.object(`profile/${data.uid}/myfavs`).subscribe(data=>{
          localStorage.setItem("currentUserMyFavs",JSON.stringify(data));
        });
       
        
        this.toast.create({
          message:'Welcome to Gootoplay Events',
          duration:3000
        }).present();
      }
      else{
        this.toast.create({
          message:`Could not find authentication details!`,
          duration:3000
        }).present();
      }
    })
  }
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
  async logout(){
        // Remove API token 
        this.afAuth.auth.signOut();
        this.navCtrl.push(LoginPage);
        localStorage.clear();
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
