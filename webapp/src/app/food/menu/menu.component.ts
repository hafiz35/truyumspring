import { Component, OnInit } from '@angular/core';
import { Food } from '../food.model';
import { FoodService } from '../food.service';
import { CartService } from 'src/app/shopping/cart/cart.service';
import { AuthenticateService } from 'src/app/site/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [FoodService]
})
export class MenuComponent implements OnInit {
  tempfoods: Food[];
  foods: Food[];
  constructor(private foodService: FoodService,private cartService:CartService,private authService:AuthenticateService,private router:Router) {
  }

  ngOnInit() {
    this.foodService.getfoods().subscribe((food: Food[]) => {
      this.foods = [...food];
      this.tempfoods = [...food];
    });
    this.foodService.filter.subscribe((obj: { title: string }) => {
      if (obj.title !== '') {
        const result = this.foods.filter(filterfood => filterfood.name.toLowerCase().includes(obj.title.toLowerCase()));
        this.foods = result ? result : [];
      } else {
        this.foods = [...this.tempfoods];
      }
    });
  }

  addFoodToCart(foodId:number){
    this.cartService.addToCart(foodId,1);
  }


}
