import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  configUrl:string="assets/data.json";
  filter = new Subject();
  constructor(private httpClient:HttpClient) { }
  
  getfoods():Observable<any>{
    return this.httpClient.get(this.configUrl);
  }
  

}
