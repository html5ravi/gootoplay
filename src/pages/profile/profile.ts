import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
 import {User} from '../../models/user.models';
// import {DashboardPage} from '../dashboard/dashboard';
import {AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

   profile = {} as User;
   
   profileData:FirebaseObjectObservable<User>;
  constructor(
    public afauth:AngularFireAuth, 
    public db:AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toast:ToastController
    ) {
  }

  ionViewWillLoad(){
    
    this.afauth.authState.subscribe(data=>{
      if(data && data.email && data.uid){
        this.toast.create({
          message:'Welcome to Gootoplay Events',
          duration:3000
        }).present();

        this.profileData = this.db.object(`profile/${data.uid}/user`);
        console.log(this.profileData);
      }
      else{
        this.toast.create({
          message:`Could not find authentication details!`,
          duration:3000
        }).present();
      }
    })
  }

  /*createProfile(){
    this.afauth.authState.take(1).subscribe(data => {
      console.log(data);
      this.db.object(`profile/${data.uid}/user`).set(this.profile)
        .then(()=> this.navCtrl.push(DashboardPage))
    })
  }*/

}
