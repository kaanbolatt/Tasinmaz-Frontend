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
  constructor(private tasinmazService: TasinmazService, private router: Router) {}

  ngOnInit() {
    this.getTasinmaz();
  }
  getTasinmaz() {
    this.tasinmazService.getTasinmaz().subscribe((response) => {
      this.tasinmaz = response.data;
    });
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
}
