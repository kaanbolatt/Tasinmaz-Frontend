import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "src/app/services/users.service";
@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.css"],
})
export class UserAddComponent implements OnInit {
  userAddForm: FormGroup;
  public popoverTitle: string = "Dikkat!";
  public popoverMessage: string =
    "Bu kullanıcıyı eklemek istediğinize emin misiniz?";
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  public cancelText: string = "İptal";
  public confirmText: string = "Ekle";
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createUserAddForm();
  }

  createUserAddForm() {
    this.userAddForm = this.formBuilder.group({
      uName: ["", Validators.required],
      uSurname: ["", Validators.required],
      uAdress: ["", Validators.required],
      uMail: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required],
    });
  }

  add() {
    if (this.userAddForm.valid) {
      let userModel = Object.assign({}, this.userAddForm.value);
      this.userService.add(userModel).subscribe(
        (data) => {
          this.toastrService.success(
            data.message,
            "Kullanıcı başarıyla eklendi!"
          );
          this.router.navigateByUrl("userlist");
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (
              let i = 0;
              i < responseError.console.error.Errors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMassage,
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
