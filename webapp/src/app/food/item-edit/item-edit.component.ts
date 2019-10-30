import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Food } from '../food.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-food-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  editmenuForm:FormGroup;
  formSubmitted:boolean=false;
  
  @Input() foodToEdit:Food;
  constructor(private route:ActivatedRoute,private foodService:FoodService,private router:Router) { }
  foodEdited:boolean;
  ngOnInit() {
    console.log(this.foodToEdit);
    this.editmenuForm=new FormGroup({
      'mname': new FormControl(null, Validators.required),
      'price': new FormControl(null,[Validators.required,Validators.pattern('^[0-9]+$')]),
      'dateOfExpiry':new FormControl(null),
      'category':new FormControl(null),
      'active':new FormControl(null),
      'freedelivery':new FormControl(null)
    });
    this.route.params.subscribe((params:Params)=>{
      const foodId=params['id'];
      console.log(foodId);
      this.foodService.getfood(foodId).subscribe((food:Food)=>{
        console.log(food);
        if(food){
          this.editmenuForm.patchValue({
            mname:food.name,
            imgsrc:food.imgsrc,
            price:food.price,
            category:food.category,
            dateOfExpiry:food.dateOfExpiry,
            active:food.active,
            freedelivery:food.freeDelivery
          });
        }else{
          this.router.navigate(['/notfound']);
        }
      });
    })
  }
  onEdited(){
    this.formSubmitted=true;
    this.editmenuForm.reset();
  }

  onSubmitEditForm(){
    this.foodEdited=true;
  }

}
