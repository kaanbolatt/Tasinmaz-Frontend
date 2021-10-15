import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import {HttpClient} from '@angular/common/http';
import { UsersService } from "src/app/services/users.service";
//axios veya fetch
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users: User[] = [];


  constructor(private usersService:UsersService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
  this.usersService.getUsers().subscribe(response=>{
  this.users=response.data

})

  }
}
