import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginValid = true;
  authSource: string = 'customer';
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthenticateService) {
  }

  ngOnInit() {
    this.authSource = this.authService.authSource;
  }

  onSubmit(form: NgForm) {
    const username = form.value.uname;
    const password = form.value.pass;
    if (username == 'john123') {
      this.isLoginValid = false;
    } else {
      this.authSource = 'customer';
      this.authService.authenticate(username, password).subscribe(data => {
          this.authService.accessToken = data['token'];
          this.authService.role = data['role'];
          if (this.authService.role !== 'ROLE_ADMIN') {
            this.authService.isAdmin = false;
            this.authService.userAuthenticated = {username:username,firstname:username,lastname:username,role:'customer'}
          } else {
            this.authService.isAdmin = true;
            this.authService.userAuthenticated = {username:'Admin',firstname:'Admin',lastname:'User',role:'admin'}
          }
          this.authService.loggedIn = true;
          this.authService.redirectUrl = "/";
          this.router.navigate([this.authService.redirectUrl]);
      },
      (error)=>{
        if(error['status']===401){
          this.isLoginValid=false;
        }
      }
      );;
    }
  }

}
