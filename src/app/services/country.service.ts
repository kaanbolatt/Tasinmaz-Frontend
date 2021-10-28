import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  apiUrl = "https://localhost:44347/api/";

  constructor(private httpClient:HttpClient) { }

  getCountry(): Observable<ListResponseModel<Country>> {
    let newPath = this.apiUrl + "country/getall";
    return this.httpClient.get<ListResponseModel<Country>>(newPath);
  }
}
