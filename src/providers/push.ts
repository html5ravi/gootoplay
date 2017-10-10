import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FCM } from '@ionic-native/fcm';
/*
  Generated class for the PushProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PushProvider {

  constructor(public http: Http, public fcm:FCM, public platform:Platform) {
    console.log('Hello PushProvider Provider');

    this.platform.ready().then(()=> {
      
      // Platform now ready, execute any required native code
      // fcm.subscribeToTopic('marketing');

fcm.getToken().then(token=>{
  // backend.registerToken(token);
  console.log(token, '--------------');
})

fcm.onNotification().subscribe(data=>{
  if(data.wasTapped){
    console.log("Received in background");
  } else {
    console.log("Received in foreground");
  };
})

// fcm.onTokenRefresh().subscribe(token=>{
//   backend.registerToken(token);
// })


    });
  }

}
