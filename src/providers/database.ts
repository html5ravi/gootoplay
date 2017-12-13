import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import { Observable } from "rxjs/Observable";
import {EventItem} from '../models/event-item/event-item.interface';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';


@Injectable()
export class DatabaseProvider {
    eventListRef$: FirebaseListObservable<EventItem[]>
   constructor(private database:AngularFireDatabase, )
   {
   }


   //: Observable<any>
   renderEvents() : Promise<any>
    {
        return new Promise((resolve) =>
        {
            this.eventListRef$ = this.database.list('Event-List');
            this.eventListRef$.subscribe(data=>{
                resolve(data);
            });
        });                       
        
    }



   deleteMovie(id) : Promise<any>
    {
        return new Promise((resolve) =>
        {
            let ref = firebase.database().ref('films').child(id);
            ref.remove();
            resolve(true);
        });
    }



   addToDatabase(eventObj) : Promise<any>
    {
        return new Promise((resolve) =>
        {
            let addRef = firebase.database().ref('Event-List');
            addRef.push(eventObj);
            resolve(true);
        });
    }



   updateDatabase(id, moviesObj) : Promise<any>
    {
        return new Promise((resolve) =>
        {
            var updateRef = firebase.database().ref('films').child(id);
            updateRef.update(moviesObj);
            resolve(true);
        });
    }



   uploadImage(imageString) : Promise<any>
    {
        let image       : string  = 'movie-' + new Date().getTime() + '.jpg',
            storageRef  : any,
            parseUpload : any;

        return new Promise((resolve, reject) =>
        {
            storageRef       = firebase.storage().ref('posters/' + image);
            parseUpload      = storageRef.putString(imageString, 'data_url');

            parseUpload.on('state_changed', (_snapshot) =>
            {
                // We could log the progress here IF necessary
                // console.log('snapshot progess ' + _snapshot);
            },
            (_err) =>
            {
                reject(_err);
            },
            (success) =>
            {
                resolve(parseUpload.snapshot);
            });
        });
    }


}