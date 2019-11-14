import { Injectable } from '@angular/core';
import { Cart } from './cart.model';
import { FoodService } from 'src/app/food/food.service';
import { AuthenticateService } from 'src/app/site/authenticate.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart:Cart={food:null,total:0};
  constructor(private foodService:FoodService,private authService:AuthenticateService,private httpClient:HttpClient) { }

  getCart(username:string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.accessToken);
    return this.httpClient.get(`http://localhost:8083/carts/${username}`, { headers });
  }

  addToCart(foodId:number,username:string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.accessToken);
    return this.httpClient.post(`http://localhost:8083/carts/${username}/${foodId}`,1, {headers});
  }
  removeFromCart(itemId:string,username:string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.accessToken);
    return this.httpClient.delete<void>(`http://localhost:8083/carts/${username}/${itemId}`, {headers});
  }
  removeItemFromCart(itemId:string,username:string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.accessToken);
    return this.httpClient.delete<void>(`http://localhost:8083/carts/all/${username}/${itemId}`, {headers});
  }
}
