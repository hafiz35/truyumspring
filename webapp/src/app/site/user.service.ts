import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  credentials: string;
  accessToken: string = '';
  constructor(private httpClient: HttpClient) { }

  authenticate(user:User):Observable<any> {
    return this.httpClient.post<any>("http://localhost:8083/users",user);
  }

  doesUserExist(username:string){
    return this.httpClient.get<boolean>(`http://localhost:8083/users/${username}`);
  }

}
