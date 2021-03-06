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
  userRol;
  ngOnInit() {
    this.createUserAddForm();
    this.userService.getUserProfiler().subscribe((res: any) => {
      console.log(res);
      console.log(res.id);
      console.log(res.name);
      console.log(res.rol);
      this.userRol = res.rol;
      console.log(this.userRol);
    });
  }

  createUserAddForm() {
    this.userAddForm = this.formBuilder.group({
      uName: ["", Validators.required],
      uSurname: ["", Validators.required],
      uAdress: ["", Validators.required],
      uMail: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-zd$@$!%*?&].{8,}"
          ),
        ],
      ],
      uRol: ["", Validators.required],
    });
  }

  add() {
    if (this.userAddForm.valid) {
      this.userAddForm.value.uRol = parseInt(this.userAddForm.value.uRol);
      let userModel = Object.assign({}, this.userAddForm.value);
      console.log(this.userAddForm.value);
      this.userService.add(userModel).subscribe(
        (data) => {
          this.toastrService.success(
            data.message,
            "Kullanıcı başarıyla eklendi!"
          );
          this.router.navigateByUrl("userlist");
        },
        (responseError) => {
          if (responseError.status == 400) {
            this.toastrService.error("Mail kullanılıyor.", "Hata!");
          }
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
