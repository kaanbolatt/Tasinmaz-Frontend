import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Tasinmaz } from "src/app/models/tasinmaz";
import { TasinmazService } from "src/app/services/tasinmaz.service";
import * as XLSX from "xlsx";
import Map from "ol/Map";
import View from "ol/View";
import Tile from "ol/layer/Tile";
import Overlay from "ol/Overlay";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import { fromLonLat, transform, toLonLat } from "ol/proj.js";
import { toStringHDMS } from "ol/coordinate";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import TileLayer from "ol/layer/Tile";

@Component({
  selector: "app-tasinmaz",
  templateUrl: "./tasinmaz.component.html",
  styleUrls: ["./tasinmaz.component.css"],
})
export class TasinmazComponent implements OnInit {
  tasinmaz: Tasinmaz[] = [];
  currentTasinmaz: Tasinmaz;
  filterTextTasinmaz = "";
  p: number = 1;
  map: Map;
  view: View;
  view2: View;
  public popoverTitle: string = "Dikkat!";
  public popoverMessage: string =
    "Bu taşınmazı silmek istediğinize emin misiniz?";
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  public cancelText: string = "İptal";
  public confirmText: string = "Sil";
  constructor(
    private tasinmazService: TasinmazService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  results: any;
  ngOnInit() {
    this.getTasinmaz();
    this.initilizeMap();
  }
  getTasinmaz() {
    this.tasinmazService.getTasinmaz().subscribe((response) => {
      this.tasinmaz = response.data;
    });
  }
  initilizeMap() {
    this.map = new Map({
      target: "map",
      layers: [new Tile({ source: new OSM() })],
      view: new View({
        center: fromLonLat([37.41, 8.82]),
        zoom: 6.5,
        minZoom: 5.8,
      }),
    });
  }
  gotoCoord(koordinatX,koordinatY) {
    console.log("X koordinatı: " +koordinatX+ " Y koordinatı: " +koordinatY);

     this.map.setView(new View({
       center: [koordinatY,koordinatX],
       zoom:15
     }))
  }
  
  setCurrentTasinmaz(tasinmaz: Tasinmaz) {
    this.currentTasinmaz = tasinmaz;
  }
  logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }
  tasinmazAdder() {
    this.router.navigateByUrl("tasinmazadd");
  }
  tasinmazDownload() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tasinmaz);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Taşınmazlar");
    XLSX.writeFile(wb, "tasinmaz-listesi.xlsx");
  }
  deleteTasinmaz(tID: any) {
    this.tasinmazService.deleteTasinmaz(tID).subscribe((data) => {
      this.getTasinmaz();
    });
  }
  tasinmazUpdate(tID: any) {
    this.router.navigateByUrl("tasinmazupdate/{{tID}}" + tID);
  }
  getCurrentData(tID: any) {
    console.log(this.route.snapshot.params.id);
    this.tasinmazService
      .getCurrentData(this.route.snapshot.params.id)
      .subscribe((result) => {
        console.log(result["data"]);
        this.results = result;
      });
  }
}
