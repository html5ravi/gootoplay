import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {FIREBASE_CONFIG} from './firebase.credentials';
import firebase from 'firebase';
import {Facebook } from '@ionic-native/facebook';

import {TimeAgoPipe} from 'time-ago-pipe';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { EventListPage } from '../pages/event-list/event-list';
import { AddEventPage } from '../pages/add-event/add-event';

firebase.initializeApp(FIREBASE_CONFIG);

@NgModule({
  declarations: [
    MyApp,
    TimeAgoPipe,
    WelcomePage,
    LoginPage,
    SignupPage,
    DashboardPage,
    EventListPage,
    AddEventPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    DashboardPage,
    EventListPage,
    AddEventPage
  ],
  providers: [
    Facebook,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

