import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  formSubmitted:boolean=false;
  constructor() { }

  ngOnInit() {
    this.signupForm=new FormGroup({
      'uname': new FormControl(null, [Validators.required,Validators.maxLength(25)], this.userExists),
      'fname': new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(45)]),
      'lname': new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(45)]),
      'pswd':new FormControl(null,Validators.required),
      'cpswd':new FormControl(null,[Validators.required,this.confirmPassword.bind(this)])
    });
  }

  userExists(formControl : FormControl):Promise<any>{
    const promise = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(formControl.value==='john123'){
            resolve({'userExist':true});
        }else{
          resolve(null);
        }
      },250);
    });
    return promise;
  }

  confirmPassword(formControl:FormControl){
    if(this.signupForm){
      if(formControl.value && formControl.value.length>0 && formControl.value!==this.signupForm.get('pswd').value){
        return { 'nomatch' : true };
      }
    }
    return null;
  }

  onSignUp(){
    this.formSubmitted=true;
    this.signupForm.reset();
  }


}
