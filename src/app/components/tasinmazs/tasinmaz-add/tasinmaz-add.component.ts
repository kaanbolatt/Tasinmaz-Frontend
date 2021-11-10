import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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
import { ScaleLine, defaults as defaultControls, Control } from "ol/control";
import { Tasinmaz } from "src/app/models/tasinmaz";
import { Province } from "src/app/models/province";
import { Neighbourhood } from "src/app/models/nb";
import { Country } from "src/app/models/country";
import { ProvinceService } from "src/app/services/province.service";
import { CountryService } from "src/app/services/country.service";
import { NbService } from "src/app/services/nb.service";
import { UsersService } from "src/app/services/users.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import ControlScaleLine from "ol/control/ScaleLine";

@Component({
  selector: "app-tasinmaz-add",
  templateUrl: "./tasinmaz-add.component.html",
  styleUrls: ["./tasinmaz-add.component.css"],
})
export class TasinmazAddComponent implements OnInit {
  country: {};
  tasinmaz: Tasinmaz[] = [];
  provinces: Province[] = [];
  nb: Neighbourhood[] = [];
  @ViewChild("closeModal") closeModal: ElementRef;
  control: ControlScaleLine;
  tasinmazAddForm: FormGroup;
  map: Map;
  view: View;
  koordinatX: number;
  koordinatY: number;
  userProfile;
  userID: number;

  scaleType = "scaleline";
  scaleBarSteps = 4;
  scaleBarText = true;
  userRol;
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
    private router: Router,
    private provinceService: ProvinceService,
    private countryService: CountryService,
    private nbService: NbService,
    private usersService: UsersService,
    private elementRef: ElementRef
  ) {}
  ngOnInit() {
    this.initilizeMap();

    this.usersService.getUserProfiler().subscribe((res: any) => {
      // console.log(res);
      // console.log(res.id);
      // console.log(res.name);
      console.log(res.rol);
      this.userID = res.id;
      // console.log(this.userID);
      this.userRol = res.rol;
    });

    this.getTasinmaz();
    this.getNb();
    this.getCountry();
    this.getProvinces();
    this.tasinmazService;
    this.createTasinmazAddForm();
  }
  getNb() {
    this.nbService.getNb().subscribe((response) => {
      console.log(response.data);
      this.nb = response.data;
    });
  }
  getCountry() {
    this.countryService.getCountry().subscribe((response) => {
      console.log(response.data);
      this.country = response.data;
    });
  }
  getProvinces() {
    this.provinceService.getProvince().subscribe((response) => {
      console.log(response.data);

      this.provinces = response.data;
    });
  }
  getTasinmaz() {}
  // scaleControl(){
  //   control = new ScaleLine({units: unitSelect.value});
  //   return Control;
  // }
  initilizeMap() {
    this.map = new Map({
      // controls: defaultControls().extend([this.scaleControl()]),
      target: "map",
      layers: [new Tile({ source: new OSM() })],
      view: new View({
        center: [3800000.0, 4700000.0],
        zoom: 6.5,
        minZoom: 5.8,
      }),
    });
    this.control = new ControlScaleLine({
      target: this.elementRef.nativeElement,
    });
    this.map.addControl(this.control);
  }
  onChange(provinceID) {
    if (provinceID) {
      console.log(provinceID);
      this.countryService.getCountryById(provinceID).subscribe((data) => {
        console.log(data);
        this.tasinmazAddForm.controls.countryID.enable();
        this.country = data.data;
        this.nb = null;
      });
    } else {
      console.log(provinceID);

      this.tasinmazAddForm.controls.countryID.disable();
      this.tasinmazAddForm.controls.nbID.disable();
      this.country = null;
      this.nb = null;
    }
  }

  countryChange(countryID: number) {
    if (countryID) {
      console.log(countryID);
      this.nbService.getNbByCId(countryID).subscribe((data) => {
        this.tasinmazAddForm.controls.nbID.enable();
        this.nb = data.data;
      });
    } else {
      this.tasinmazAddForm.controls.nb.disable();
      this.nb = null;
    }
  }

  getCoord(event) {
    var coordinate = this.map.getEventCoordinate(event);
    this.koordinatX = coordinate[1];
    this.koordinatY = coordinate[0];
    console.log(coordinate);
    console.log(this.koordinatX);
    console.log(this.koordinatY);
    this.tasinmazAddForm.controls["koordinatX"].setValue(
      this.koordinatX.toString()
    );
    this.tasinmazAddForm.controls["koordinatY"].setValue(
      this.koordinatY.toString()
    );
    // document.getElementById("closeModalButton").click();
    this.closeModal.nativeElement.click();

    // ref.click();
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
    console.log(this.tasinmazAddForm);
    console.log(this.tasinmazAddForm.valid);
    if (this.tasinmazAddForm.valid) {
      let tasinmazModel = Object.assign({}, this.tasinmazAddForm.value);
      tasinmazModel["provinceID"] = parseInt(tasinmazModel["provinceID"]);
      tasinmazModel["countryID"] = parseInt(tasinmazModel["countryID"]);
      tasinmazModel["nbID"] = parseInt(tasinmazModel["nbID"]);
      tasinmazModel["uID"] = this.userID;
      console.log("buraya kadar geldim mi?");
      console.log(this.userID);
      this.tasinmazService.add(tasinmazModel).subscribe((data) => {
        console.log("buraya gir?");
        this.tasinmazAddForm.reset();
        this.toastrService.success("Yeni taşınmaz eklendi!", "Kayıt başarılı!");
        this.tasinmazAddForm.controls.countryID.disable();
        this.tasinmazAddForm.controls.nbID.disable();
        this.nb = null;
        this.country = null;
        this.router.navigateByUrl("tasinmazlist");
      });
    } else {
      this.toastrService.error("Formunuz eksik!", "Dikkat!");
    }
  }

  logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }
}
