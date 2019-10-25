import { Injectable } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  loggedIn=false;
  isAdmin=false;
  accessToken:string;
  redirectUrl='/';
  userAuthenticated:User;
  constructor(private userService:UserService) { }

  authenticate(username:string,password:string){
    this.userService.authenticate(username,password).subscribe((user:User)=>{
      if(user){
        this.loggedIn=true;
        this.userAuthenticated=user;
        this.isAdmin=user.role==='Admin';
      }
    });
  }
  logOut(){
    this.redirectUrl='/';
    this.loggedIn=false;
  }
  isAdminUser(){
    return this.isAdmin;
  }
}
