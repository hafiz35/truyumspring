import { Component, OnInit } from '@angular/core';
import { Cart } from './cart.model';
import { CartService } from './cart.service';
import { AuthenticateService } from 'src/app/site/authenticate.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:Cart = {food:[],total:0};
  cartEmpty:boolean=false;
  constructor(private cartService:CartService,private authService:AuthenticateService) {
    this.cartService.getCart(this.authService.userAuthenticated.username).subscribe(data => {
        this.cart.food=data['menuItemList'];
        this.cart.total=data['total'];
      });
    }
  ngOnInit() {
    
  }
  onRemove(itemId:string){
    this.cartService.removeFromCart(itemId,this.authService.userAuthenticated.username).subscribe(()=>this.refreshPage());
  }
  onAdd(itemId:string){
    this.cartEmpty=false;
    this.cartService.addToCart(+itemId,this.authService.userAuthenticated.username).subscribe(()=>this.refreshPage());
  }
  onRemoveItem(itemId:string){
    this.cartService.removeItemFromCart(itemId,this.authService.userAuthenticated.username).subscribe(()=>this.refreshPage());
  }
  refreshPage(){
    this.cartService.getCart(this.authService.userAuthenticated.username).subscribe(data => {
      this.cart.food=data['menuItemList'];
      this.cart.total=data['total'];
    },
    (error)=>{
      if(error['error']['message']==='Cart is Empty'){
        this.cartEmpty=true;
      }
    }
    );
  }
}
