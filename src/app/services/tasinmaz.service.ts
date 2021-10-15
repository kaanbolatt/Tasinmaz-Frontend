import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Tasinmaz } from '../models/tasinmaz';



@Injectable({
  providedIn: 'root'
})
export class TasinmazService {

  apiUrl = "https://localhost:44347/api/";

  constructor(private httpClient:HttpClient) { }
  
  getTasinmaz():Observable<ListResponseModel<Tasinmaz>>{
    let newPath = this.apiUrl + "tasinmaz/getall"
    return this.httpClient.get<ListResponseModel<Tasinmaz>>(newPath);
  }

  getTasinmazByUser(uID:number):Observable<ListResponseModel<Tasinmaz>>{
    let newPath = this.apiUrl + "/tasinmaz/getbyuserid?uID="+uID
    return this.httpClient.get<ListResponseModel<Tasinmaz>>(newPath);
  }
}
