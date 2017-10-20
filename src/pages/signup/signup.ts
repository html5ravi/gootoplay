import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from '../../models/user.models';
// import { ProfilePage} from '../profile/profile';
import {Profile} from '../../models/profile';
 import {LoginPage} from '../login/login';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Facebook } from '@ionic-native/facebook';
import { DashboardPage } from '../dashboard/dashboard';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  profile = {} as Profile;
  profileDataRef$: FirebaseListObservable<Profile>;
  user = {} as User
  public loadingLogo:boolean = false;
  public loginData:any;
  signupForm:FormGroup;
  displayName:String = '';
  phoneNumber:Number = null;
  email:String = '';
  password:String = '';
  address:String = '';
  requiredVal:string = "This field is required";

  constructor(
    public toast:ToastController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public afauth:AngularFireAuth, 
    public db:AngularFireDatabase,
    private facebook:Facebook,
    public fb:FormBuilder
  ) {
    this.signupForm = fb.group({
      'displayName':[null,Validators.required],
      'phoneNumber':[null,Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
      'email':[null,Validators.compose([Validators.required,Validators.email])],
      'password':[null,Validators.required],
      'address':[null,Validators.required]
    });

  }

  async register(user:User) {
   console.log(user);
     try{
      const result = await this.afauth.auth.createUserWithEmailAndPassword(user.email,user.password);
        this.navCtrl.push(LoginPage);
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
    });
  };

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

}
