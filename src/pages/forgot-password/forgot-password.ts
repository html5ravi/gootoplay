import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, AlertController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  
  constructor(public navCtrl: NavController,
  public alertCtrl:AlertController, public navParams: NavParams,public afAuth:AngularFireAuth,private viewCtrl:ViewController) {
    
    
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ForgotPasswordPage');
  }

  alerts(t,m,e){
    const alert = this.alertCtrl.create({
        title: t,
        message: m,
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              if(e=='yes'){this.viewCtrl.dismiss();}
            }
          }]
      });
      alert.present();
  }

   resetPwd(email){
     if(email){     
      this.afAuth.auth.sendPasswordResetEmail(email).then((data)=>{
        console.log(data)
        this.alerts('Reset Password','We have sent an email with reset link to reset password. Please check your email.','yes');
        
      }).catch((error)=> {
        console.log(error)
        this.alerts('Invalid Email',error.message,'no');
      });
    }else{
       this.alerts('Email field is required','Please endter Email','no');
     }
  }
  dismissModal(){
    this.viewCtrl.dismiss();
  }

}
