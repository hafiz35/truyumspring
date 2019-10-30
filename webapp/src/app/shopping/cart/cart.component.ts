import { Component, OnInit } from '@angular/core';
import { Cart } from './cart.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:Cart;
  constructor(private cartService:CartService) {
    this.cart=this.cartService.getCart();
   }
  ngOnInit() {
    
  }
  onRemove(itemId:string){
    this.cartService.removeFromCart(itemId);
  }
}
