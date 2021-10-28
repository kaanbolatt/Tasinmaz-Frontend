import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { userUpdateModel } from "src/app/models/userUpdateModel";
import { User } from "src/app/models/user";

@Component({
  selector: "app-user-update",
  templateUrl: "./user-update.component.html",
  styleUrls: ["./user-update.component.css"],
})
export class UserUpdateComponent implements OnInit {
  userModelObj: userUpdateModel = new userUpdateModel();
  submitted = false;
  user:User[] = [];

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

  constructor(
    private router: ActivatedRoute,
    private userService: UsersService,
    private routers: Router
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
          uName: new FormControl(result["data"]["0"]["uName"]),
          uSurname: new FormControl(result["data"]["0"]["uSurname"]),
          uMail: new FormControl(result["data"]["0"]["uMail"]),
          uAdress: new FormControl(result["data"]["0"]["uAdress"]),
          password: new FormControl(""),
          uRol: new FormControl(result["data"]["0"]["uRol"]),
        });
        console.log(this.editUser);
      });
  }
  updateUser() {
    this.userModelObj.uID = this.results["data"]["0"]["uID"];
    this.userModelObj.uName = this.editUser.value.uName;
    this.userModelObj.uSurname = this.editUser.value.uSurname;
    this.userModelObj.uMail = this.editUser.value.uMail;
    this.userModelObj.uAdress = this.editUser.value.uAdress;
    this.userModelObj.password = this.editUser.value.password;
    this.userModelObj.uRol = parseInt(this.editUser.value.uRol);
    console.log(this.userModelObj);
    this.userService
      .updateUser(this.userModelObj, this.userModelObj.uID)
      .subscribe((result) => {
        this.editUser.reset();
        this.userService.getUsers();
        this.routers.navigateByUrl("userlist");
      });
  }
  logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }
}
