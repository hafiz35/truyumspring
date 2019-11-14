import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private authService:AuthenticateService) { }

  ngOnInit() {
  }

  isAuthenticated(){
    this.authService.authSource="customer";
    return this.authService.loggedIn;
  }
  isAdmin(){
    return this.authService.isAdminUser();
  }
  getUser(){
    return this.authService.userAuthenticated;
  }
  onSignOut(){
    this.authService.logOut();
    this.router.navigate([this.authService.redirectUrl]);
  }
}
