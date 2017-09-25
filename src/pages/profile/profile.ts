import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
 import {User} from '../../models/user.models';
 import { storage} from 'firebase';
// import {DashboardPage} from '../dashboard/dashboard';
import {AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Camera, CameraOptions} from '@ionic-native/camera';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

   profile = {} as User;
   public currentUser:any = JSON.parse(localStorage.getItem("currentUser"));
   profileData:FirebaseObjectObservable<User>;
  constructor(
    public afauth:AngularFireAuth, 
    public db:AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toast:ToastController,
    public camera:Camera
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

  async takePhoto(){
    try{
      const cameraOptions : CameraOptions = {
             //sourceType         : this.camera.PictureSourceType.PHOTOLIBRARY,
             destinationType    : this.camera.DestinationType.DATA_URL,
             quality            : 100,
             targetWidth        : 320,
             targetHeight       : 240,
             encodingType       : this.camera.EncodingType.JPEG,
             correctOrientation : true,
             mediaType:this.camera.MediaType.PICTURE
         };
      const result = await this.camera.getPicture(cameraOptions);
      const img = `data:image/jpeg;base64,${result}`;
      const pics = storage().ref(`users/${this.currentUser.uid}`);
      pics.putString(img,'data_url');
      
    }
    catch(e){
      console.error(e);
    }
  }

}
