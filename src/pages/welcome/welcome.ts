import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
// import { DashboardPage } from '../dashboard/dashboard';
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  login(){
  this.navCtrl.push(LoginPage);
  //this.navCtrl.setRoot(DashboardPage);
  }

  signup(){
  this.navCtrl.push(SignupPage);
  }

} 
