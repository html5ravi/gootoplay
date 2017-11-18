import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
/**
 * Generated class for the VideoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
public videoURL:any;
  public carousel: any = [{
    eventTitle:"H.K Prakash Cup 2017",
    eventDate:"09-Sep-2017",
    videos:[{
      id:"Pwy4jG2ExOk",
      title:"Semi Final",
      players:"Amar Jith & Yeswanth Vs Abhishek & Partner"
    },{
      id:"SDqrOtFhVPM",
      title:"Semi Final",
      players:"Amar Jith & Yeswanth Vs Abhishek & Partner"
    },{
      id:"IOmta8T_HnY",
      title:"Semi Final",
      players:"Amar Jith & Yeswanth Vs Abhishek & Partner"
    },{
      id:"p-hdIRjDx3Q",
      title:"Semi Final",
      players:"Amar Jith & Yeswanth Vs Abhishek & Partner"
    },{
      id:"_zxxJgkPhvU",
      title:"Semi Final",
      players:"Amar Jith & Yeswanth Vs Abhishek & Partner"
    },{
      id:"dgZxzv8SDoQ",
      title:"Semi Final",
      players:"Amar Jith & Yeswanth Vs Abhishek & Partner"
    }]
  },{
    eventTitle:"Play Extrem Cup 2017",
    eventDate:"10-Aug-2017",
    videos:[{
      id:"Pwy4jG2ExOk",
      title:"Semi Final",
      players:"Amar Jith & Yeswanth Vs Abhishek & Partner"
    },{
      id:"SDqrOtFhVPM",
      title:"Semi Final",
      players:"Amar Jith & Yeswanth Vs Abhishek & Partner"
    },{
      id:"IOmta8T_HnY",
      title:"Semi Final",
      players:"Amar Jith & Yeswanth Vs Abhishek & Partner"
    },{
      id:"p-hdIRjDx3Q",
      title:"Semi Final",
      players:"Amar Jith & Yeswanth Vs Abhishek & Partner"
    },{
      id:"_zxxJgkPhvU",
      title:"Semi Final",
      players:"Amar Jith & Yeswanth Vs Abhishek & Partner"
    },{
      id:"dgZxzv8SDoQ",
      title:"Semi Final",
      players:"Amar Jith & Yeswanth Vs Abhishek & Partner"
    }]
  }];
  //public images:any = ['1.jpg','2.jpg','3.jpg','4.jpg']
  constructor(public navCtrl: NavController, public navParams: NavParams, private youtube: YoutubeVideoPlayer) {
    //this.selectedItem = navParams.get('item');
    let id = ["SDqrOtFhVPM","Pwy4jG2ExOk","IOmta8T_HnY","p-hdIRjDx3Q","_zxxJgkPhvU","dgZxzv8SDoQ"];
    this.videoURL = 'http://img.youtube.com/vi/' + id + '/default.jpg';
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Tab2Page');
    //url = 'http://img.youtube.com/vi/' + thumb + '/default.jpg';
 
    
  }
  async openVideo(){
    try{
      await this.youtube.openVideo('SDqrOtFhVPM');
    }
    catch(e){
      console.error(e);
    }
    
  }
}
