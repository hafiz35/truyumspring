import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Food } from '../food.model';
import { AuthenticateService } from 'src/app/site/authenticate.service';
import { Router } from '@angular/router';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-food-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {
  @Input() food: Food[];
  @Output() addedToCart: EventEmitter<number> = new EventEmitter<number>();
  foodAdded = false;
  constructor(private authService: AuthenticateService, private router: Router, private foodService: FoodService) { }

  ngOnInit() {
  }
  isLoggedIn(){
    return this.authService.loggedIn;
  }
  isAdmin() {
    return this.authService.loggedIn && this.authService.isAdminUser();
  }
  onAddToCart(foodId: number) {
    if (this.authService.loggedIn) {
      this.authService.authSource='customer';
      this.addedToCart.emit(foodId);
      this.foodAdded = true;
      setTimeout(() => {
        this.foodAdded = false;
      }, 1000);
    }
    else{
      this.authService.authSource='cart';
      this.router.navigate(['/login']);
    }
    return false;
  }

}
