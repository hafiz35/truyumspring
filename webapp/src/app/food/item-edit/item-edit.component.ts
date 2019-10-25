import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-food-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  editmenuForm:FormGroup;
  formSubmitted:boolean=false;
  constructor() { }

  ngOnInit() {
    this.editmenuForm=new FormGroup({
      'mname': new FormControl(null, Validators.required),
      'price': new FormControl(null,[Validators.required,Validators.pattern('^[0-9]+$')]),
    });
  }
  onEdited(){
    this.formSubmitted=true;
    this.editmenuForm.reset();
  }

}
