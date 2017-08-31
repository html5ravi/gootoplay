import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import {Facebook } from '@ionic-native/facebook';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private facebook:Facebook) {
  }

  login() {
    this.facebook.login(['email']).then((info)=>{
      let credential = firebase.auth.FacebookAuthProvider.credential(info.authResponse.accessToken);
      firebase.auth().signInWithCredential(credential).then((result)=>{
        alert(JSON.stringify(result));
      })
    })
  }
  dummylogin(){
    this.navCtrl.push(DashboardPage);
  }


}
