import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ListResponseModel } from "../models/listResponseModel";
import { Tasinmaz } from "../models/tasinmaz";
import { ResponseModel } from "../models/responseModel";

@Injectable({
  providedIn: "root",
})
export class TasinmazService {
  apiUrl = "https://localhost:44347/api/";
  boslukKontrol = "Bu alan boş bırakılamaz.";

  constructor(private httpClient: HttpClient) {}

  getTasinmaz(): Observable<ListResponseModel<Tasinmaz>> {
    let newPath = this.apiUrl + "tasinmaz/getall";
    return this.httpClient.get<ListResponseModel<Tasinmaz>>(newPath);
  }

  getTasinmazByUser(uID: number): Observable<ListResponseModel<Tasinmaz>> {
    let newPath = this.apiUrl + "tasinmaz/getbyuserid?uID=" + uID;
    return this.httpClient.get<ListResponseModel<Tasinmaz>>(newPath);
  }

  getTasinmazByProvinceID(
    provinceID: number
  ): Observable<ListResponseModel<Tasinmaz>> {
    return this.httpClient.get<ListResponseModel<Tasinmaz>>(
      this.apiUrl + "tasinmaz/province/" + provinceID
    );
  }
  getTasinmazByCountryID(
    countryID: number
  ): Observable<ListResponseModel<Tasinmaz>> {
    return this.httpClient.get<ListResponseModel<Tasinmaz>>(
      this.apiUrl + "tasinmaz/country/" + countryID
    );
  }

  add(tasinmaz: Tasinmaz): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + "tasinmaz/add",
      tasinmaz
    );
  }
  deleteTasinmaz(Id) {
    return this.httpClient.delete(this.apiUrl + "tasinmaz/" + Id);
  }

  getCurrentData(Id) {
    return this.httpClient.get(this.apiUrl + "tasinmaz/" + Id);
  }
  updateTasinmaz(data: any, Id: number) {
    return this.httpClient.put(this.apiUrl + "tasinmaz/update/" + Id, data);
  }
}
