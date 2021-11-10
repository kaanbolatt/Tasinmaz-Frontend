import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Neighbourhood } from '../models/nb';

@Injectable({
  providedIn: 'root'
})
export class NbService {
  apiUrl = "https://localhost:44347/api/";

  constructor(private httpClient:HttpClient) { }

  getNb(): 
    Observable<ListResponseModel<Neighbourhood>> {
    let newPath = this.apiUrl + "nb/getall";
    return this.httpClient.get<ListResponseModel<Neighbourhood>>(newPath);
  }
  getNbByCId(countryID):
  Observable<ListResponseModel<Neighbourhood>>{
    let newPath = this.apiUrl + "nb/getbycountryid?id=" + countryID
    return this.httpClient.get<ListResponseModel<Neighbourhood>>(newPath)
  }

  }
