import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ListResponseModel } from "../models/listResponseModel";
import { ResponseModel } from "../models/responseModel";
import { Rol } from "../models/rol";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  apiUrl = "https://localhost:44347/api/";
  constructor(private httpClient: HttpClient) {}
  sifreKontrol =
    "Şifre en az 8 karakterden oluşmalı. İçerisinde 1 özel karakter, 1 rakam ve en az 1 büyük harf içermelidir.";
  boslukKontrol = "Bu alan boş bırakılamaz.";

  getUsers(): Observable<ListResponseModel<User>> {
    return this.httpClient.get<ListResponseModel<User>>(
      this.apiUrl + "users/getall"
    );
  }
  getRols(): Observable<ListResponseModel<Rol>> {
    return this.httpClient.get<ListResponseModel<Rol>>(
      this.apiUrl + "rol/getall"
    );
  }

  add(user: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + "auth/register",
      user
    );
  }
  deleteUser(uID) {
    return this.httpClient.delete(this.apiUrl + "users/" + uID);
  }

  getCurrentData(uID) {
    return this.httpClient.get(this.apiUrl + "users/" + uID);
  }
  updateUser(data: any, uID: number) {
    return this.httpClient.put(this.apiUrl + "users/update/" + uID, data);
  }

  getUserProfiler() {
    return this.httpClient.get(this.apiUrl + "GetUser/");
  }
}
