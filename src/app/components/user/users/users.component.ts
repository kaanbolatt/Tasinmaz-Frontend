import { Component, OnInit, TemplateRef } from "@angular/core";
import { User } from "src/app/models/user";
import { UsersService } from "src/app/services/users.service";
import { Router, RouterModule } from "@angular/router";
import { Rol } from "src/app/models/rol";

//axios veya fetch
@Component({
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users: any;
  rols: Rol[] = [];
  searchText = "";
  currentUser: User;
  p: number = 1;
  filterTextUser = "";
  public popoverTitle: string = "Dikkat!";
  public popoverMessage: string =
    "Bu kullanıcıyı silmek istediğinize emin misiniz?";
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  public cancelText: string = "İptal";
  public confirmText: string = "Sil";
  userRol;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.getUsers();
    this.getRols();
    this.usersService.getUserProfiler().subscribe((res: any) => {
      console.log(res);
      console.log(res.id);
      console.log(res.name);
      console.log(res.rol);
      this.userRol = res.rol;
      console.log(this.userRol);
    });
  }
  key: string = "id";
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse != !this.reverse;
  }
  getUsers() {
    this.usersService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }
  getRols() {
    this.usersService.getRols().subscribe((response) => {
      this.rols = response.data;
    });
  }

  setCurrentUsers(user: User) {
    this.currentUser = user;
  }
  isAdmin() {
    if ((this.userRol = 1)) {
      console.log("bu adam admin");
      return true;
    } else {
      // this.router.navigate([""]);
      console.log("bu adam user");
      return false;
    }
  }
  getCurrentTasinmazClass(user: User) {
    if (user == this.currentUser) {
      return "list-group-item active";
    } else {
      return "list-group-item";
    }
  }
  logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }
  userAdder() {
    this.router.navigateByUrl("useradd");
  }
  deleteUser(uID: any) {
    this.usersService.deleteUser(uID).subscribe((data) => {
      this.getUsers();
    });
  }
  userUpdate(uID: any) {
    this.router.navigateByUrl("userupdate/{{uID}}" + uID);
  }
}
