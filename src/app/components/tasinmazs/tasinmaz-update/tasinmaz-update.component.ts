import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TasinmazService } from "src/app/services/tasinmaz.service";
import { tasinmazUpdateModel } from "src/app/models/tasinmazUpdateModel";
import { ProvinceService } from "src/app/services/province.service";
import { CountryService } from "src/app/services/country.service";
import { NbService } from "src/app/services/nb.service";
import { Country } from "src/app/models/country";
import { Province } from "src/app/models/province";
import { Neighbourhood } from "src/app/models/nb";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-tasinmaz-update",
  templateUrl: "./tasinmaz-update.component.html",
  styleUrls: ["./tasinmaz-update.component.css"],
})
export class TasinmazUpdateComponent implements OnInit {
  tasinmazModelObj: tasinmazUpdateModel = new tasinmazUpdateModel();
  submitted = false;
  country: Country[] = [];
  provinces: Province[] = [];
  nb: Neighbourhood[] = [];
  editTasinmaz = new FormGroup({
    provinceID: new FormControl(""),
    countryID: new FormControl(""),
    nbID: new FormControl(""),
    ada: new FormControl(""),
    parsel: new FormControl(""),
    nitelik: new FormControl(""),
    koordinatX: new FormControl(""),
    koordinatY: new FormControl(""),
  });
  public popoverTitle: string = "Dikkat!";
  public popoverMessage: string =
    "Bu taşınmazı güncellemek istediğinize emin misiniz?";
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  public cancelText: string = "İptal";
  public confirmText: string = "Güncelle";

  constructor(
    private router: ActivatedRoute,
    private tasinmazService: TasinmazService,
    private routers: Router,
    private provinceService: ProvinceService,
    private countryService: CountryService,
    private nbService: NbService,
    private toastrService: ToastrService
  ) {}

  results: any;
  ngOnInit(): void {
    this.tasinmazService
      .getCurrentData(this.router.snapshot.params.id)
      .subscribe((result) => {
        console.log(result["data"]);

        this.results = result;
        this.editTasinmaz = new FormGroup({
          provinceID: new FormControl(
            result["data"]["provinceID"],
            Validators.required
          ),
          countryID: new FormControl(
            result["data"]["countryID"],
            Validators.required
          ),
          nbID: new FormControl(result["data"]["nbID"], Validators.required),
          ada: new FormControl(result["data"]["ada"], Validators.required),
          nitelik: new FormControl(
            result["data"]["nitelik"],
            Validators.required
          ),
          parsel: new FormControl(
            result["data"]["parsel"],
            Validators.required
          ),
          koordinatX: new FormControl(
            result["data"]["koordinatX"],
            Validators.required
          ),
          koordinatY: new FormControl(
            result["data"]["koordinatY"],
            Validators.required
          ),
        });
      });
    this.getNb();
    this.getCountry();
    this.getProvinces();
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
  onChange(event) {
    if (event) {
      this.countryService.getCountryById(event).subscribe((data) => {
        this.editTasinmaz.controls.countryID.enable();
        this.editTasinmaz.controls.nbID.disable();
        this.country = data.data;
        this.editTasinmaz.value.countryID = null;
        this.nb = null;
        console.log("object");
      });
    } else {
      this.editTasinmaz.controls.countryID.disable();
      this.editTasinmaz.controls.nbID.disable();
      this.country = null;
      this.nb = null;
    }
  }

  countryChange(countryID: number) {
    if (countryID) {
      console.log(countryID);
      this.nbService.getNbByCId(countryID).subscribe(
        (data) => {
          this.editTasinmaz.controls.nbID.enable();
          this.nb = data.data;
          this.editTasinmaz.value.nbID = null;
          console.log(this.nb);
        },
        (responseError) => {
          if (responseError.status == 400) {
            this.toastrService.error("Boş alan var!", "Hata!");
          }
        }
      );
    } else {
      console.log("else girdim mi?");
      this.editTasinmaz.controls.nb.disable();
      this.nb = null;
    }
  }
  updateTasinmaz() {
    if (this.editTasinmaz.valid) {
      this.tasinmazModelObj.Id = this.results["data"]["Id"];
      this.tasinmazModelObj.provinceID = parseInt(
        this.editTasinmaz.value.provinceID
      );
      this.tasinmazModelObj.countryID = parseInt(
        this.editTasinmaz.value.countryID
      );
      this.tasinmazModelObj.nbID = parseInt(this.editTasinmaz.value.nbID);
      this.tasinmazModelObj.ada = this.editTasinmaz.value.ada;
      this.tasinmazModelObj.nitelik = this.editTasinmaz.value.nitelik;
      this.tasinmazModelObj.parsel = this.editTasinmaz.value.parsel;
      this.tasinmazModelObj.koordinatX = this.editTasinmaz.value.koordinatX;
      this.tasinmazModelObj.koordinatY = this.editTasinmaz.value.koordinatY;
      this.tasinmazService
        .updateTasinmaz(this.tasinmazModelObj, this.tasinmazModelObj.Id)
        .subscribe(
          (result) => {
            this.editTasinmaz.reset();
            this.tasinmazService.getTasinmaz();
            this.routers.navigateByUrl("tasinmazlist");
          },
          (responseError) => {
            if (responseError.status == 400) {
              this.toastrService.error("Boş alan var!", "Hata!");
            }
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
