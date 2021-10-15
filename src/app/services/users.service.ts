import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = "https://localhost:44347/api/users/getall";

  constructor(private httpClient:HttpClient) { }
  
  getUsers():Observable<ListResponseModel<User>>{
    return this.httpClient.get<ListResponseModel<User>>(this.apiUrl);
  }
}
