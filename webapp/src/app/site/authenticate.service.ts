import { Injectable } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  loggedIn=false;
  isAdmin=false;
  accessToken:string;
  authSource:string;
  redirectUrl='/';
  userAuthenticated:User;
  constructor(private userService:UserService,private http:HttpClient) { }

  authenticate(username:string,password:string){
    this.http.get("http://localhost:8083/authenticate").subscribe(data=>{
      this.accessToken=data['token'];
    })
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
