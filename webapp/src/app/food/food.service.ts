import { Injectable } from '@angular/core';
import { Observable, Subject, Observer } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Food } from './food.model';
import { AuthenticateService } from '../site/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  filter = new Subject();
  token: string = "";
  constructor(private httpClient: HttpClient, private authService: AuthenticateService) {
  }

  getfoods(): Observable<any> {
    this.token = this.authService.accessToken;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.token);
    return this.httpClient.get("http://localhost:8083/menu-items", { headers });
  }

  getfood(id: number): Observable<any> {
    return Observable.create((observer: Observer<Food>) => {
      this.getfoods().subscribe((foods: Food[]) => {
        const fd = foods.find(food => food.id == id);
        observer.next(fd);
      });
    });
  }

  updateFoodItem(food: Food): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.accessToken
      })
    };
    return this.httpClient.put<void>("http://localhost:8083/menu-items", food, httpOptions);
  }


}
