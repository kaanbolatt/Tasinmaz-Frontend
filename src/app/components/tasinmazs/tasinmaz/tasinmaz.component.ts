import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Tasinmaz } from "src/app/models/tasinmaz";
import { TasinmazService } from "src/app/services/tasinmaz.service";

@Component({
  selector: "app-tasinmaz",
  templateUrl: "./tasinmaz.component.html",
  styleUrls: ["./tasinmaz.component.css"],
})
export class TasinmazComponent implements OnInit {
  tasinmaz: Tasinmaz[] = [];
  currentTasinmaz: Tasinmaz;
  filterTextTasinmaz = "";
  p:number = 1;
  public popoverTitle: string ='Dikkat!';
  public popoverMessage: string ='Bu taşınmazı silmek istediğinize emin misiniz?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  public cancelText: string = "İptal";
  public confirmText: string = "Sil";
  constructor(private tasinmazService: TasinmazService, private router: Router) {}

  ngOnInit() {
    this.getTasinmaz();
  }
  getTasinmaz() {
    this.tasinmazService.getTasinmaz().subscribe((response) => {
      this.tasinmaz = response.data;
    });
  }
  setCurrentTasinmaz(tasinmaz: Tasinmaz) {
    this.currentTasinmaz = tasinmaz;
  }
  logout(){
    localStorage.removeItem("token");
    window.location.reload();
  }
  tasinmazAdder(){
    this.router.navigateByUrl("tasinmazadd");
  }
  deleteTasinmaz(tID: any){
    this.tasinmazService.deleteTasinmaz(tID).subscribe(data=>{
      this.getTasinmaz();
    })
  }
  tasinmazUpdate(tID: any) {
    this.router.navigateByUrl("tasinmazupdate/{{tID}}"+tID)
  }
}
