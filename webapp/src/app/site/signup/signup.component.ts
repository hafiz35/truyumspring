import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { AuthenticateService } from '../authenticate.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  formSubmitted:boolean=false;
  user:User;
  userAlreadyExists:boolean=false;
  constructor(private userService:UserService,private authService:AuthenticateService) { }

  ngOnInit() {
    
    this.signupForm=new FormGroup({
      'uname': new FormControl(null, [Validators.required,Validators.maxLength(25)]),
      'fname': new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(45)]),
      'lname': new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(45)]),
      'pswd':new FormControl(null,Validators.required),
      'cpswd':new FormControl(null,[Validators.required,this.confirmPassword.bind(this)])
    });
  }

  userExist() {
    if(this.signupForm.get('uname').value.length>0){
    
    
    this.userService.doesUserExist(this.signupForm.get('uname').value).subscribe(data=>{
      this.userAlreadyExists=data;
    });
  }}


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
    let username=this.signupForm.get('uname').value;
    let firstname=this.signupForm.get('fname').value;
    let lastname=this.signupForm.get('lname').value;
    let password=this.signupForm.get('pswd').value;
    this.user = {username:username,firstname:firstname,lastname:lastname,password:password};
    this.userAlreadyExists=false;
    this.userService.authenticate(this.user).subscribe((data)=>{
        console.log(data);
      },
      (error)=>{
        if(error['error']['message']==='User Already Exist'){
          this.userAlreadyExists=true;
        }        
      }
      );
      this.signupForm.reset();
  }

}
