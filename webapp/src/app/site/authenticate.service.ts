import { Injectable } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  loggedIn=false;
  isAdmin=false;
  authSource:string;
  redirectUrl='/';
  userAuthenticated:User;
  accessToken: string;
  role:string;
  constructor(private userService:UserService,private http:HttpClient) { }

  authenticate(username:string,password:string):Observable<any>{
    let credentials = btoa(username + ':' + password);
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + credentials);
    return this.http.get("http://localhost:8083/authenticate", { headers })
  }
  logOut(){
    this.redirectUrl='/';
    this.loggedIn=false;
  }
  isAdminUser(){
    return this.isAdmin;
  }
}
