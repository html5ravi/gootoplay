import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from '../../models/user.models';
// import { ProfilePage} from '../profile/profile';
 import {Profile} from '../../models/profile';
import {DashboardPage} from '../dashboard/dashboard';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  profile = {} as Profile;
   profileDataRef$: FirebaseListObservable<Profile>;
user = {} as User
  constructor(
    public toast:ToastController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public afauth:AngularFireAuth, 
    public db:AngularFireDatabase
  ) {
  }

  async register(user:User) {
    try{
      const result = await this.afauth.auth.createUserWithEmailAndPassword(user.email,user.password);
        this.navCtrl.push(DashboardPage);
        if(result){
          this.toast.create({
            message:'Successfully registered! Please do login!',
            duration:3000
          }).present();          
        }
    }
    catch(e){
      console.error(e);
    }
    this.afauth.authState.take(1).subscribe(data => {
      console.log(data);
      this.profile.email = user.email;      
      this.db.object(`profile/${data.uid}/user`).set(this.profile);
        //.then(()=> this.navCtrl.push(DashboardPage))
    });
  }

}
