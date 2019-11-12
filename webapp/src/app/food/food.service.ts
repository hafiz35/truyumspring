import { Injectable } from '@angular/core';
import { Observable, Subject, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Food } from './food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  configUrl:string="http://localhost:8083/menu-items";
  filter = new Subject();
  constructor(private httpClient:HttpClient) { }
  
  getfoods():Observable<any>{
    return this.httpClient.get(this.configUrl);
  }
  
  getfood(id:number):Observable<any>{
   return Observable.create((observer:Observer<Food>)=>{
     this.getfoods().subscribe((foods:Food[])=>{
       const fd=foods.find(food=>food.id==id);
       observer.next(fd);
     });
   });
  }

}
