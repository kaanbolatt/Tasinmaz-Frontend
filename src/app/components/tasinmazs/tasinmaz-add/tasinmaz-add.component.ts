import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TasinmazService } from "src/app/services/tasinmaz.service";
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
  selector: "app-tasinmaz-add",
  templateUrl: "./tasinmaz-add.component.html",
  styleUrls: ["./tasinmaz-add.component.css"],
})
export class TasinmazAddComponent implements OnInit {
  tasinmazAddForm: FormGroup;
  map: Map;
  view: View;
  koordinatX: number;
  koordinatY: number;
  public popoverTitle: string = "Dikkat!";
  public popoverMessage: string =
    "Bu taşınmazı eklemek istediğinize emin misiniz?";
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  public cancelText: string = "İptal";
  public confirmText: string = "Ekle";
  constructor(
    private formBuilder: FormBuilder,
    private tasinmazService: TasinmazService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createTasinmazAddForm();
    this.initilizeMap();
  }
  initilizeMap() {
    this.map = new Map({
      target: "map",
      layers: [new Tile({ source: new OSM() })],
      view: new View({
        center: [3800000.1, 4700000.1],
        zoom: 6.5,
        minZoom: 5.8,
      }),
    });

    this.map.on("singleclick", function (evt) {
      const coordinate = evt.coordinate;
      const hdms = toStringHDMS(toLonLat(coordinate));
      console.log(toLonLat(coordinate));
      this.koordinatX = coordinate[0];
      this.koordinatY = coordinate[1];
      console.log(this.koordinatX);
      console.log(this.koordinatY);
    });
  }

  getCoord(event) {
    var coordinate = this.map.getEventCoordinate(event);
    this.koordinatX = coordinate[1];
    this.koordinatY = coordinate[0];
    this.tasinmazAddForm.controls["koordinatX"].setValue(
      this.koordinatX.toString()
    );
    this.tasinmazAddForm.controls["koordinatY"].setValue(
      this.koordinatY.toString()
    );
    let ref = document.getElementById("cancel");
    ref.click();
  }

  createTasinmazAddForm() {
    this.tasinmazAddForm = this.formBuilder.group({
      provinceID: ["", Validators.required],
      countryID: ["", Validators.required],
      nbID: ["", Validators.required],
      ada: ["", Validators.required],
      parsel: ["", Validators.required],
      nitelik: ["", Validators.required],
      koordinatX: ["", Validators.required],
      koordinatY: ["", Validators.required],
    });
  }
  addTasinmaz() {
    if (this.tasinmazAddForm.valid) {
      let tasinmazModel = Object.assign({}, this.tasinmazAddForm.value);
      this.tasinmazService.add(tasinmazModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, "Başarılı!");
          this.router.navigateByUrl("tasinmazlist");
        }
         ,responseError =>{
           this.toastrService.success("Taşınmaz Eklendi!", "Başarılı!");
           this.router.navigateByUrl("tasinmazlist");

         }
      );
    } else {
      this.toastrService.error("Formunuz eksik!", "Dikkat!");
      
    }
  }

  logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }
}
