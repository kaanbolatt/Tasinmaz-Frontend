import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import{Log} from "src/app/models/log"
import * as XLSX from 'xlsx'


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  logs: Log[] = [];
  currentLog: Log;
  filterTextLog = "";
  p:number = 1;
  public popoverTitle: string ='Dikkat!';
  public popoverMessage: string ='Bu logu silmek istediğinize emin misiniz?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  public cancelText: string = "İptal";
  public confirmText: string = "Sil";

  constructor(private logService:LogService) { }

  ngOnInit(): void {
    this.getLog()
  }

  getLog() {
    this.logService.getLog().subscribe((response) => {
      this.logs = response.data;
    });
  }

  deleteLog(logID: any){
    this.logService.deleteLog(logID).subscribe(data=>{
      this.getLog();
    })
  }

  logout(){
    localStorage.removeItem("token");
    window.location.reload();
  }
  logDownload(){
    
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.logs);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Loglar');
      XLSX.writeFile(wb, 'log-listesi.xlsx');
  }
}
