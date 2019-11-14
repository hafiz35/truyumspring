import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Food } from '../food.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FoodService } from '../food.service';
import { AuthenticateService } from 'src/app/site/authenticate.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-food-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  editmenuForm:FormGroup;
  formSubmitted:boolean=false;
  foodUpdated:Food;
  foodId:number;
  imgsrc:string='';
  @Input() foodToEdit:Food;
  constructor(private route:ActivatedRoute,private foodService:FoodService,private router:Router,private authService:AuthenticateService,private httpClient:HttpClient) { }
  foodEdited:boolean;
  ngOnInit() {
    this.editmenuForm=new FormGroup({
      'mname': new FormControl(null, Validators.required),
      'price': new FormControl(null,[Validators.required,Validators.pattern('^[0-9]+$')]),
      'dateOfExpiry':new FormControl(null),
      'category':new FormControl(null),
      'active':new FormControl(null),
      'freedelivery':new FormControl(null)
    });
    this.route.params.subscribe((params:Params)=>{
      this.foodId=params['id'];
      this.foodService.getfood(this.foodId).subscribe((food:Food)=>{
        food.dateOfExpiry=new Date(food.dateOfExpiry);
        if(food){
          this.imgsrc=food.imgSrc;
           this.editmenuForm.patchValue({
            mname:food.name,
            imgsrc:food.imgSrc,
            price:food.price,
            category:food.category,
            dateOfExpiry:food.dateOfExpiry.toISOString().slice(0,10),
            active:food.active,
            freedelivery:food.freeDelivery
          });
        }else{
          this.router.navigate(['/notfound']);
        }
      });
    })
  }
  onEdited(food:any){
    this.formSubmitted=true;
    let name=this.editmenuForm.get('mname').value;
    let price=this.editmenuForm.get('price').value;
    let category=this.editmenuForm.get('category').value;
    let dateOfExpiry=this.editmenuForm.get('dateOfExpiry').value;
    let active=this.editmenuForm.get('active').value;
    let freeDelivery=this.editmenuForm.get('freedelivery').value;
    this.foodUpdated = {id:this.foodId,name:name,price:price,imgSrc:this.imgsrc,category:category,dateOfExpiry:dateOfExpiry,active:active,freeDelivery:freeDelivery};
    this.foodService.updateFoodItem(this.foodUpdated).subscribe();
    this.editmenuForm.reset();
  }

  onSubmitEditForm(){
    this.foodEdited=true;
  }

}
