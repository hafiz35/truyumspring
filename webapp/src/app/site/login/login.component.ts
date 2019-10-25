import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginValid=true;
  authSource:string;
  constructor(private router:Router,private route:ActivatedRoute,private authService:AuthenticateService) {
   }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    const username = form.value.uname;
    const password = form.value.pass;
      console.log(username);
      console.log(password);
      if(username=='john'){
        this.isLoginValid=false;
      }else{
        this.authService.authenticate(username,password);
        this.router.navigate([this.authService.redirectUrl]);
      }
    }
   
}
