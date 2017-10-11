import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from '../../models/user.models';
// import { ProfilePage} from '../profile/profile';
import {Profile} from '../../models/profile';
// import {LoginPage} from '../login/login';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Facebook } from '@ionic-native/facebook';
import { DashboardPage } from '../dashboard/dashboard';
import { FormBuilder, FormGroup, Validators,AbstractControl} from '@angular/forms';

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
  displayName:AbstractControl;
  phoneNumber:AbstractControl;
  email:AbstractControl;
  password:AbstractControl;
  address:AbstractControl;


  constructor(
    public toast:ToastController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public afauth:AngularFireAuth, 
    public db:AngularFireDatabase,
    private facebook:Facebook,
    public formbuilder:FormBuilder
  ) {
    this.signupForm = formbuilder.group({
      displayName:['',Validators.required],
      phoneNumber:['',Validators.required],
      email:['',Validators.required,Validators.email],
      password:['',Validators.required],
      address:['',Validators.required]
    });
    this.displayName = this.signupForm.controls['displayName'];
    this.phoneNumber = this.signupForm.controls['phoneNumber'];
    this.email = this.signupForm.controls['email'];
    this.password = this.signupForm.controls['password'];
    this.address = this.signupForm.controls['address'];

  }

  register(user:User) {
   
     if(!this.signupForm.valid){
        console.log(this.signupForm.value);
    }else {
        console.log("success!");
    }
    /*try{
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
    });*/
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
