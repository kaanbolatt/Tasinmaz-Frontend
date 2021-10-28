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
import {ScaleLine, defaults as defaultControls, Control} from 'ol/control';
import { Tasinmaz } from "src/app/models/tasinmaz";
import { Province } from "src/app/models/province";
import { Neighbourhood } from "src/app/models/nb";
import { Country } from "src/app/models/country";
import { ProvinceService } from "src/app/services/province.service";
import { CountryService } from "src/app/services/country.service";
import { NbService } from "src/app/services/nb.service";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-tasinmaz-add",
  templateUrl: "./tasinmaz-add.component.html",
  styleUrls: ["./tasinmaz-add.component.css"],
})
export class TasinmazAddComponent implements OnInit {
  country: Country[] = [];
  tasinmaz: Tasinmaz[] = [];
  provinces: Province[] = [];
  nb: Neighbourhood[] = [];
  
  tasinmazAddForm: FormGroup;
  map: Map;
  view: View;
  koordinatX: number;
  koordinatY: number;
  userProfile;
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
    private usersService: UsersService
  ) {}
  ngOnInit() {
    this.usersService.getUserProfiler().subscribe(
      res=>{
        this.userProfile = res;
        console.log(this.userProfile);
        console.log(this.userProfile["uID"]);
        // console.log(res);
        // console.log(res["uID"]);
        // console.log(res["uName"]);
        // console.log(res["uRol"]);
      }
    );
    this.getTasinmaz();
    this.getNb();
    this.getCountry();
    this.getProvinces();
    this.tasinmazService
    this.createTasinmazAddForm();
    this.initilizeMap();
  }
  getNb() {
    this.nbService.getNb().subscribe((response) => {
      this.nb = response.data;
    });
  }
  getCountry() {
    this.countryService.getCountry().subscribe((response) => {
      this.country = response.data;
    });
  }
  getProvinces() {
    this.provinceService.getProvince().subscribe((response) => {
      this.provinces = response.data;
    });
  }
  getTasinmaz() {
    this.tasinmazService.getTasinmaz().subscribe((response) => {
      this.tasinmaz = response.data;
    });
  }
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
        center: fromLonLat([37.41, 8.82]),
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
   provinceChange(provinceID: number) {
     if (provinceID) {
       this.tasinmazService
         .getTasinmazByProvinceID(provinceID)
         .subscribe((data) => {
           console.log("province Change Data: "+data);
           this.tasinmazAddForm.controls.countryID.enable();
          //  this.country = data;
           this.nb = null;
         });
     } else {
       this.tasinmazAddForm.controls.countryID.disable();
       this.tasinmazAddForm.controls.nb.disable();
       this.country = null;
       this.nb = null;
     }
   }
   onChange(event){
     if(event){
     console.log(event);
      
     }
     else{
       console.log("Event yok.");
     }
   }
   countryChange(countryID: number) {
     if (countryID) {
       this.tasinmazService
         .getTasinmazByCountryID(countryID)
         .subscribe((data) => {
          console.log("countryChange: "+data);

           this.tasinmazAddForm.controls.nbID.enable();
          //  this.nb = data;
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
      uID:[this.userProfile["uID"],Validators.required], //burada patlayacak.  GİRİŞ YAPAN USER ID ÇEK.
      parsel: ["", Validators.required],
      nitelik: ["", Validators.required],
      koordinatX: ["", Validators.required],
      koordinatY: ["", Validators.required],
    });
  }
  addTasinmaz() {
    if (this.tasinmazAddForm.valid) {
      let tasinmazModel = Object.assign({}, this.tasinmazAddForm.value);
      tasinmazModel["provinceID"]=parseInt(tasinmazModel["provinceID"])
      tasinmazModel["countryID"]=parseInt(tasinmazModel["countryID"])
      tasinmazModel["nbID"]=parseInt(tasinmazModel["nbID"])
      this.tasinmazService.add(tasinmazModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, "Başarılı!");
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
