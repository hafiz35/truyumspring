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
    //console.log(user);
    return this.httpClient.post<any>("http://localhost:8083/users",user);
  }
}
