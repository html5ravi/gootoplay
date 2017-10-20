import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import {Facebook } from '@ionic-native/facebook';
import {GooglePlus } from '@ionic-native/google-plus';
import { DashboardPage } from '../dashboard/dashboard';
import {User} from '../../Models/user.models';
import {Profile} from '../../models/profile';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  profile = {} as Profile;
  public loadingLogo:boolean = false;
  profileDataRef$: FirebaseListObservable<Profile>;
  public loginData:any;
  public errorMsg:string;
  user = {} as User;
  constructor(public afAuth:AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, private facebook:Facebook, public googleplus:GooglePlus,public afauth:AngularFireAuth, 
    public db:AngularFireDatabase) {
      
  }

  fblogin() {
    this.loadingLogo = true;
    this.facebook.login(['email', 'public_profile']).then((info)=>{
      let credential = firebase.auth.FacebookAuthProvider.credential(info.authResponse.accessToken);
      firebase.auth().signInWithCredential(credential).then((result)=>{
        alert(JSON.stringify(result));
        this.loginData = JSON.stringify(result);
        this.profile.displayName = result.displayName;
        this.profile.email = result.email;
        this.profile.phoneNumber = result.phoneNumber;
        this.profile.photoURL = result.photoURL;
        this.db.object(`profile/${result.uid}/user`).set(this.profile);
        this.navCtrl.setRoot(DashboardPage);
        this.loadingLogo = false;
      })
    })
  }
 
  async login(user:User){
    //console.log(user.email);
    this.loadingLogo = true;
   //user.email = 'ravi@ravi.com'; user.password = '123456';
    if( user.email == undefined || user.password == undefined){
      this.errorMsg ="Email or Password fields must not be empty!";
      this.loadingLogo = false;
    }else{
      try{
        const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
        if(result){
          this.navCtrl.setRoot(DashboardPage);
          this.loadingLogo = false;
        }
      }
      catch(e){
        this.errorMsg ="Email or Password is incorrect!";
        this.loadingLogo = false;
      }
    }
    
  }


}
