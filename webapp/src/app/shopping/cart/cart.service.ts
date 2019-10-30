import { Injectable } from '@angular/core';
import { Cart } from './cart.model';
import { UUID } from "angular2-uuid";
import { FoodService } from 'src/app/food/food.service';
import { Food } from 'src/app/food/food.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart:Cart={items:null,total:0};
  constructor(private foodService:FoodService) { }

  getCart(){
    return this.cart;
  }

  addToCart(foodId:number,quantity:number){
    this.foodService.getfood(foodId).subscribe((foodToAdd:Food)=>{
      const uid=UUID.UUID();
      if (this.cart.items===null){
        console.log(uid);
        this.cart.items=[{itemId:uid,food:foodToAdd,quantity}];
        this.cart.total=foodToAdd.price;
      }
      else{
        this.cart.items.push({itemId:uid,food:foodToAdd,quantity});
        this.cart.total+=foodToAdd.price;
      }
    });
  }
  removeFromCart(itemId:string){
    const itemIndex=this.cart.items.findIndex(cartItem=>cartItem.itemId==itemId);
    const itemToRemove=this.cart.items.splice(itemIndex,1)[0];
    this.cart.total-=itemToRemove.food.price;
  }
  clearCart(){
    this.cart.items=null;
    this.cart.total=0;
  }
}
