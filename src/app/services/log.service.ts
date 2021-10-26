
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ListResponseModel } from "../models/listResponseModel";
import { Log } from "../models/log";
import { ResponseModel } from "../models/responseModel";

@Injectable({
  providedIn: 'root'
})
export class LogService {
  apiUrl = "https://localhost:44347/api/";
  constructor(private httpClient: HttpClient) { }

  getLog(): Observable<ListResponseModel<Log>> {
    let newPath = this.apiUrl + "logs/getall";
    return this.httpClient.get<ListResponseModel<Log>>(newPath);
  }

  deleteLog(logID) {
    return this.httpClient.delete(this.apiUrl + "logs/" + logID);
  }

  getCurrentData(logID) {
    return this.httpClient.get(this.apiUrl + "logs/" + logID);
  }
}
