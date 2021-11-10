import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { userUpdateModel } from "src/app/models/userUpdateModel";
import { User } from "src/app/models/user";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-user-update",
  templateUrl: "./user-update.component.html",
  styleUrls: ["./user-update.component.css"],
})
export class UserUpdateComponent implements OnInit {
  userModelObj: userUpdateModel = new userUpdateModel();
  submitted = false;
  user: User[] = [];

  editUser = new FormGroup({
    uName: new FormControl(""),
    uSurname: new FormControl(""),
    uMail: new FormControl(""),
    uAdress: new FormControl(""),
    password: new FormControl(""),
    uRol: new FormControl(""),
  });
  public popoverTitle: string = "Dikkat!";
  public popoverMessage: string =
    "Bu kullanıcıyı güncellemek istediğinize emin misiniz?";
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  public cancelText: string = "İptal";
  public confirmText: string = "Güncelle";
  userRol;
  constructor(
    private router: ActivatedRoute,
    private userService: UsersService,
    private routers: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}
  results: any;
  ngOnInit(): void {
    console.log(this.router.snapshot.params.id);
    this.userService
      .getCurrentData(this.router.snapshot.params.id)
      .subscribe((result) => {
        console.log(result["data"]);
        this.results = result;
        this.editUser = new FormGroup({
          uName: new FormControl(
            result["data"]["0"]["uName"],
            Validators.required
          ),
          uSurname: new FormControl(
            result["data"]["0"]["uSurname"],
            Validators.required
          ),
          uMail: new FormControl(result["data"]["0"]["uMail"], [
            Validators.required,
            Validators.email,
          ]),
          uAdress: new FormControl(
            result["data"]["0"]["uAdress"],
            Validators.required
          ),
          password: new FormControl("", [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-zd$@$!%*?&].{8,}"
            ),
          ]),
          uRol: new FormControl(
            result["data"]["0"]["uRol"],
            Validators.required
          ),
        });
        console.log(this.editUser);
      });

    this.userService.getUserProfiler().subscribe((res) => {
      console.log(res);
      console.log(res["uID"]);
      console.log(res["uName"]);
      console.log(res["uRol"]);
      this.userRol = res["uRol"];
      console.log(this.userRol);
    });
  }
  updateUser() {
    if (this.editUser.valid) {
      this.userModelObj.uID = this.results["data"]["0"]["uID"];
      this.userModelObj.uName = this.editUser.value.uName;
      this.userModelObj.uSurname = this.editUser.value.uSurname;
      this.userModelObj.uMail = this.editUser.value.uMail;
      this.userModelObj.uAdress = this.editUser.value.uAdress;
      this.userModelObj.password = this.editUser.value.password;
      this.userModelObj.uRol = parseInt(this.editUser.value.uRol);
      console.log(this.userModelObj);
      console.log("buraya geliyoz mu?");
      this.userService
        .updateUser(this.userModelObj, this.userModelObj.uID)
        .subscribe(
          (result) => {
            console.log("giriyon mu?");
            this.editUser.reset();
            this.userService.getUsers();
            this.routers.navigateByUrl("userlist");
          },
          (responseError) => {
            if (responseError.status == 400) {
              this.toastrService.error("Mail kullanılıyor.", "Hata!");
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
