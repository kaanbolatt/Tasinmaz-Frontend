import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TasinmazService } from "src/app/services/tasinmaz.service";
import { tasinmazUpdateModel } from "src/app/models/tasinmazUpdateModel";

@Component({
  selector: "app-tasinmaz-update",
  templateUrl: "./tasinmaz-update.component.html",
  styleUrls: ["./tasinmaz-update.component.css"],
})
export class TasinmazUpdateComponent implements OnInit {
  tasinmazModelObj: tasinmazUpdateModel = new tasinmazUpdateModel();
  submitted = false;

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
    private routers: Router
  ) {}

  results: any;
  ngOnInit(): void {
    console.log(this.router.snapshot.params.id);
    this.tasinmazService
      .getCurrentData(this.router.snapshot.params.id)
      .subscribe((result) => {
        console.log(result["data"]);
        this.results = result;
        this.editTasinmaz = new FormGroup({
          provinceID: new FormControl(result["data"]["provinceID"]),
          countryID: new FormControl(result["data"]["countryID"]),
          nbID: new FormControl(result["data"]["nbID"]),
          ada: new FormControl(result["data"]["ada"]),
          nitelik: new FormControl(result["data"]["nitelik"]),
          parsel: new FormControl(result["data"]["parsel"]),
          koordinatX: new FormControl(result["data"]["koordinatX"]),
          koordinatY: new FormControl(result["data"]["koordinatY"]),
        });
      });
  }
  updateTasinmaz() {
    this.tasinmazModelObj.tID = this.results["data"]["tID"];
    this.tasinmazModelObj.provinceID = this.editTasinmaz.value.provinceID;
    this.tasinmazModelObj.countryID = this.editTasinmaz.value.countryID;
    this.tasinmazModelObj.nbID = this.editTasinmaz.value.nbID;
    this.tasinmazModelObj.ada = this.editTasinmaz.value.ada;
    this.tasinmazModelObj.nitelik = this.editTasinmaz.value.nitelik;
    this.tasinmazModelObj.koordinatX = this.editTasinmaz.value.koordinatX;
    this.tasinmazModelObj.koordinatY = this.editTasinmaz.value.koordinatY;
    console.log("Taşınmaz ID: "+this.tasinmazModelObj.tID);
    this.tasinmazService
      .updateTasinmaz(this.tasinmazModelObj, this.tasinmazModelObj.tID)
      .subscribe((result) => {
        this.editTasinmaz.reset();
        this.tasinmazService.getTasinmaz();
        this.routers.navigateByUrl("tasinmazlist");
      });
  }
  logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }
}
