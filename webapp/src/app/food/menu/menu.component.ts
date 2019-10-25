import { Component, OnInit } from '@angular/core';
import { Food } from '../food.model';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers:[FoodService]
})
export class MenuComponent implements OnInit {
  tempfoods:Food[];
  foods:Food[];
  constructor(private foodService:FoodService) {
   }

  ngOnInit() {
    this.foodService.getfoods().subscribe((food:Food[])=>{
      this.foods=[...food];
      this.tempfoods=[...food];
    });
    this.foodService.filter.subscribe((obj:{title:string})=>{
        if(obj.title!==''){
          const result=this.tempfoods.filter(fd=>fd.name.toLowerCase().includes(obj.title.toLowerCase()));
          this.foods=result?result:[];
        }else{
          this.foods=[...this.tempfoods];
        }
    });
  }



}
