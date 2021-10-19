import { Component, OnInit } from "@angular/core";
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
  deleteUser(uID: any){
    this.usersService.deleteUser(uID).subscribe(data=>{
      this.getUsers();
    })
  }
}
