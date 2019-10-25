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
    return this.authService.loggedIn;
  }
  isAdmin(){
    return this.authService.isAdmin;
  }
  getUser(){
    return this.authService.userAuthenticated;
  }

}
