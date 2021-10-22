import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import{Log} from "src/app/models/log"

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  log: Log[] = [];
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
  }

  getTasinmaz() {
    this.logService.getLog().subscribe((response) => {
      this.log = response.data;
    });
  }

  logout(){
    localStorage.removeItem("token");
    window.location.reload();
  }
}
