import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Food } from '../food.model';

@Component({
  selector: 'app-food-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  editmenuForm:FormGroup;
  formSubmitted:boolean=false;
  @Input() foodToEdit:Food;
  constructor() { }

  ngOnInit() {
    console.log(this.foodToEdit);
    this.editmenuForm=new FormGroup({
      'mname': new FormControl(this.foodToEdit.name, Validators.required),
      'price': new FormControl(this.foodToEdit.price,[Validators.required,Validators.pattern('^[0-9]+$')]),
    });
  }
  onEdited(){
    this.formSubmitted=true;
    this.editmenuForm.reset();
  }

}
