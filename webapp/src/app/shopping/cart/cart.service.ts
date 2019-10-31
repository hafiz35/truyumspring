import { Injectable } from '@angular/core';
import { Cart } from './cart.model';
import { UUID } from "angular2-uuid";
import { FoodService } from 'src/app/food/food.service';
import { Food } from 'src/app/food/food.model';
import { createNodeAtIndex } from '@angular/core/src/render3/instructions';

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
        let repeated=this.cart.items.findIndex(cartItem=>cartItem.food.id===foodId);
        if(repeated!==-1){
          this.cart.items[repeated].quantity+=quantity;
        }
        else{
          this.cart.items.push({itemId:uid,food:foodToAdd,quantity});
        }
        this.cart.total+=foodToAdd.price*quantity;
      }
    });
  }
  removeFromCart(itemId:string){
    const itemIndex=this.cart.items.findIndex(cartItem=>cartItem.itemId==itemId);
    const itemToRemove=this.cart.items.splice(itemIndex,1)[0];
    this.cart.total-=itemToRemove.food.price*itemToRemove.quantity;
  }
  removeQuantity(itemId:number){
    const itemIndex=this.cart.items.findIndex(cartItem=>cartItem.food.id===itemId);
    if(itemIndex!==-1){
      this.cart.total-=this.cart.items[itemIndex].food.price;
      this.cart.items[itemIndex].quantity--;
      if(this.cart.items[itemIndex].quantity<1){
        this.cart.items.splice(itemIndex,1);
      }
    }
  }
  clearCart(){
    this.cart.items=null;
    this.cart.total=0;
  }

}
