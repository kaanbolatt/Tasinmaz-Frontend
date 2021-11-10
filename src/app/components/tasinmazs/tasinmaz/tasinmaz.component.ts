import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Tasinmaz } from "src/app/models/tasinmaz";
import { TasinmazService } from "src/app/services/tasinmaz.service";
import { UsersService } from "src/app/services/users.service";
import * as XLSX from "xlsx";
import Map from "ol/Map";
import View from "ol/View";
import Tile from "ol/layer/Tile";
import Overlay from "ol/Overlay";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import { FeatureCollection } from "geojson";
import { fromLonLat, transform, toLonLat } from "ol/proj.js";
import { toStringHDMS } from "ol/coordinate";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import TileLayer from "ol/layer/Tile";
import Control from "ol/control/Control";
import CanvasScaleLine from "ol/control/ScaleLine";
import { User } from "src/app/models/user";
import ControlScaleLine from "ol/control/ScaleLine";
import { CountryService } from "src/app/services/country.service";
import { NbService } from "src/app/services/nb.service";
import { ProvinceService } from "src/app/services/province.service";
import { utils } from "protractor";
import { Summary } from "@angular/compiler";

@Component({
  selector: "app-tasinmaz",
  templateUrl: "./tasinmaz.component.html",
  styleUrls: ["./tasinmaz.component.css"],
})
export class TasinmazComponent implements OnInit {
  user;
  tasinmaz: any;
  nb: any;
  province: any;
  country: any;
  currentTasinmaz: Tasinmaz;
  filterTextTasinmaz = "";
  p: number = 1;
  totalLength: any;
  map: Map;
  Id;
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
    private route: ActivatedRoute,
    private userService: UsersService,
    private elementRef: ElementRef,
    private countryService: CountryService,
    private nbService: NbService,
    private provinceService: ProvinceService
  ) {}
  staticBreadcrumbs: GeoJSON.FeatureCollection<GeoJSON.Geometry>;
  results: any;
  userRol: number;
  userID: number;
  ngOnInit() {
    this.getTasinmaz();
    this.initilizeMap();
    this.provinceService.getProvince().subscribe((data) => {
      this.province = data;
      // console.log(this.province["data"]);
      // console.log(this.province["data"]);
      for (let i = 0; i < this.province.data.length; i++) {
        const pID = this.province["data"][i]["provinceID"];
        // console.log(pID);
        const pName = this.province["data"][i]["provinceName"];
        // console.log(pName);
      }
      // console.log("-------------");
    });
    this.countryService.getCountry().subscribe((data) => {
      this.country = data;
      // console.log(this.country["data"]);
      for (let i = 0; i < this.country.data.length; i++) {
        const cID = this.country["data"][i]["countryID"];
        // console.log(cID);
        const cName = this.country["data"][i]["countryName"];
        // console.log(cName);
      }
      // console.log("-------------");
    });
    this.nbService.getNb().subscribe((data) => {
      this.nb = data;
      // console.log(this.nb["data"]);
      for (let i = 0; i < this.nb.data.length; i++) {
        const nbID = this.nb["data"][i]["nbID"];
        // console.log(nbID);
        const nbName = this.nb["data"][i]["nbName"];
        // console.log(nbName);
      }
      // console.log("-------------");
    });

    this.userService.getUserProfiler().subscribe((res) => {
      // console.log(res);
      // console.log(res["uID"]);
      // console.log(res["uRol"]);
      this.results = res;
      // console.log(res);
      // console.log(this.results);
      this.userRol = this.results.rol;
      // console.log(this.userRol);
      this.userID = this.results.Id;
    });
  }
  getTasinmaz() {
    this.tasinmazService.getTasinmaz().subscribe((response) => {
      this.tasinmaz = response;
      console.log(this.tasinmaz);
      // console.log(this.tasinmaz);
    });
  }
  key: string = "id";
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse != !this.reverse;
  }
  control: ControlScaleLine;
  initilizeMap() {
    this.map = new Map({
      target: "map",
      layers: [new Tile({ source: new OSM() })],
      view: new View({
        center: fromLonLat([37.41, 8.82]),
        zoom: 3,
        minZoom: 5.8,
      }),
    });
    this.control = new ControlScaleLine({
      target: this.elementRef.nativeElement,
    });
    this.map.addControl(this.control);
  }
  koordinatPoint: any;
  gotoCoord(koordinatX, koordinatY) {
    console.log("X koordinatı: " + koordinatX + " Y koordinatı: " + koordinatY);
    this.koordinatPoint = toLonLat([koordinatX, koordinatY]);
    console.log(this.koordinatPoint);

    // this.staticBreadcrumbs = {
    //   type: "FeatureCollection",
    //   features: [
    //     {
    //       type: "Feature",
    //       properties: {
    //         id: 12,
    //       },
    //       geometry: {
    //         type: "Point",
    //         coordinates: [koordinatX, koordinatY],
    //       },
    //     },
    //   ],
    // };
    // console.log(
    //   this.staticBreadcrumbs.features[0].geometry["coordinates"] +
    //     " " +
    //     this.staticBreadcrumbs.features[0]
    // );

    // if (this.staticBreadcrumbs.features[0].geometry.type === "Point") {
    //   this.staticBreadcrumbs.features[0].geometry.coordinates[koordinatX];
    //   this.staticBreadcrumbs.features[0].geometry.coordinates[koordinatY];
    //   console.log(this.staticBreadcrumbs);
    // }
    this.map.setView(
      new View({
        center: [koordinatY, koordinatX],
        zoom: 17,
      })
    );
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
  deleteTasinmaz(Id: any) {
    this.tasinmazService.deleteTasinmaz(Id).subscribe((data) => {
      console.log(data);
      this.getTasinmaz();
    });
  }
  tasinmazUpdate(Id: any) {
    this.router.navigateByUrl("tasinmazupdate/{{Id}}" + Id);
  }
  getCurrentData(Id: any) {
    console.log(this.route.snapshot.params.id);
    this.tasinmazService
      .getCurrentData(this.route.snapshot.params.id)
      .subscribe((result) => {
        // console.log(result["data"]);
        this.results = result;
      });
  }
}
