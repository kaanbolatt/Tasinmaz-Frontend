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
@Component({
  selector: "app-tasinmaz-add",
  templateUrl: "./tasinmaz-add.component.html",
  styleUrls: ["./tasinmaz-add.component.css"],
})
export class TasinmazAddComponent implements OnInit {
  tasinmazAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private tasinmazService: TasinmazService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createTasinmazAddForm();
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
  add() {
    if (this.tasinmazAddForm.valid) {
      let tasinmazModel = Object.assign({}, this.tasinmazAddForm.value);
      this.tasinmazService.add(tasinmazModel).subscribe(
        (data) => {
          this.toastrService.success(
            data.message,
            "Taşınmaz başarıyla eklendi!"
          );
          this.router.navigateByUrl("tasinmazlist");
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (
              let i = 0;
              i < responseError.console.error.Errors.lenght;
              i++
            ) {
              this.toastrService.error(
                responseError.error.Errors[i].ErorrMassage,
                "Doğrulama hatası."
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error("Formunuz eksik.", "Dikkat!");
    }
  }
  logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }
}
