import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ListResponseModel } from "../models/listResponseModel";
import { Province } from '../models/province';
import { ResponseModel } from "../models/responseModel";

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  apiUrl = "https://localhost:44347/api/";

  constructor(private httpClient:HttpClient) { }

  getProvince(): Observable<ListResponseModel<Province>> {
    let newPath = this.apiUrl + "province/getall";
    return this.httpClient.get<ListResponseModel<Province>>(newPath);
  }

}
