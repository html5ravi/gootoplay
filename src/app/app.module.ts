import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {IonicImageViewerModule} from 'ionic-img-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';


import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {FIREBASE_CONFIG} from './firebase.credentials';
import firebase from 'firebase';
import {Facebook } from '@ionic-native/facebook';
import { SuperTabsModule } from 'ionic2-super-tabs';
import {Camera} from '@ionic-native/camera';
import {Network} from '@ionic-native/network';

import {TimeAgoPipe} from 'time-ago-pipe';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { EventListPage } from '../pages/event-list/event-list';
import { EventDetailsPage } from '../pages/event-details/event-details';
import { AddEventPage } from '../pages/add-event/add-event';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { ProfilePage } from '../pages/profile/profile';
import { DashboardHomePage } from '../pages/dashboard-home/dashboard-home';
import { Tab1Page } from '../pages/tabs/tab1/tab1';
import { Tab2Page } from '../pages/tabs/tab2/tab2';
import { Tab3Page } from '../pages/tabs/tab3/tab3';
import { PushProvider } from '../providers/push';

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
    AddEventPage,
    ProfilePage,
    DashboardHomePage,
    Tab1Page,
    Tab2Page,
    Tab3Page,
    EventDetailsPage,
    ForgotPasswordPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SuperTabsModule.forRoot(),
    IonicImageViewerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    DashboardPage,
    EventListPage,
    AddEventPage,
    ProfilePage,
    DashboardHomePage,
    Tab1Page,
    Tab2Page,
    Tab3Page,
    ForgotPasswordPage,
    EventDetailsPage
  ],
  providers: [
    Facebook,
    Network,
    Camera,
    SocialSharing,
    Screenshot,
    YoutubeVideoPlayer,    
    ScreenOrientation,
    StatusBar,
    SplashScreen,    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PushProvider
  ]
})
export class AppModule {}

