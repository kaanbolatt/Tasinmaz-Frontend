import { Component, OnInit, TemplateRef } from "@angular/core";
import { User } from "src/app/models/user";
import { UsersService } from "src/app/services/users.service";
import { Router, RouterModule } from "@angular/router";




//axios veya fetch
@Component({
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  searchText = "";
  currentUser: User;
  p: number = 1;
  filterTextUser="";
  public popoverTitle: string = "Dikkat!";
  public popoverMessage: string =
    "Bu kullanıcıyı silmek istediğinize emin misiniz?";
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  public cancelText: string = "İptal";
  public confirmText: string = "Sil";

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe((response) => {
      this.users = response.data;
    });
  }

  setCurrentUsers(user: User) {
    this.currentUser = user;
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
    this.router.navigateByUrl("userupdate/{{uID}}"+uID)
  }
  
}
