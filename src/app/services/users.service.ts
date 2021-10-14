import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserResponseModel } from '../models/userResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = "https://localhost:44347/api/users/getall";

  constructor(private httpClient:HttpClient) { }
  
  getUsers():Observable<UserResponseModel>{
    return this.httpClient.get<UserResponseModel>(this.apiUrl);
  }
}
