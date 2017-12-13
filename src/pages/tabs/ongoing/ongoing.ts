
import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { EventItem } from '../../../models/event-item/event-item.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { MyFav } from '../../../models/myfav';
import { EventDetailsPage } from '../../event-details/event-details';
import { DatabaseProvider } from '../../../providers/database';      


@Component({
  selector: 'page-ongoing',
  templateUrl: 'ongoing.html',
})
export class OngoingPage {
public isFavourite: boolean = false;
  myFav = {} as MyFav;
  searchText:string = '';
  eventObj:any = [];
  public today = new Date().getTime();
  public getDate = new Date("2016-08-20").getTime(); 

  public currentUser:any = JSON.parse(localStorage.getItem("currentUser"));
  public myFavs:any = JSON.parse(localStorage.getItem("currentUserMyFavs"));
  
  
  
  constructor(
    public db:AngularFireDatabase,
    public modalCtrl: ModalController,
    private data:DatabaseProvider
    ) {      
      
      this.data.renderEvents().then(data=>{
        console.log(data)
        this.eventObj = data;
      })
   
  }

ongoingEvent(dates){
  let todayDate = new Date().toISOString().slice(0,10);
  if(todayDate == dates){
    return true;
  }else{
    return false;
  }  
};

  isFavouriteFun(item){    
    item.favourite = !item.favourite;
      if(item.favourite){
        this.db.object(`profile/${this.currentUser.uid}/myfavs/${item.$key}/`).set({"eventId":item.$key});        
      }else{
        this.db.list(`profile/${this.currentUser.uid}/myfavs`).remove(item.$key);
      }        
  }
  goToEventDetails(eventItem:EventItem){
    let modal = this.modalCtrl.create(EventDetailsPage,{eventId: eventItem.$key});
    modal.present();
  }


}



