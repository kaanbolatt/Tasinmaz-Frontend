import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  user = {
    uID: 1,
    uName: "Sumru",
    uSurname: "Ozal",
    uMail: "h2okaan@gmail.com",
    uNumber: "123",
    uAdress: "Ankara",
    Status: "1",
  }; //burada hata olabilir bookmark kontrol.
  user2 = {
    uID: 2,
    uName: "Kenan",
    uSurname: "Ozal",
    uMail: "h2okaan@gmail.com",
    uNumber: "123",
    uAdress: "Ankara",
    Status: "1",
  }; //burada hata olabilir bookmark kontrol.
  user3 = {
    uID: 3,
    uName: "Özlem",
    uSurname: "Ozal",
    uMail: "h2okaan@gmail.com",
    uNumber: "123",
    uAdress: "Ankara",
    Status: "1",
  }; //burada hata olabilir bookmark kontrol.
  user4 = {
    uID: 4,
    uName: "Esma",
    uSurname: "Ozal",
    uMail: "h2okaan@gmail.com",
    uNumber: "123",
    uAdress: "Ankara",
    Status: "1",
  }; //burada hata olabilir bookmark kontrol.
  user5 = {
    uID: 5,
    uName: "Yılmaz",
    uSurname: "Ozal",
    uMail: "h2okaan@gmail.com",
    uNumber: "123",
    uAdress: "Ankara",
    Status: "1",
  }; //burada hata olabilir bookmark kontrol.
  users = [this.user, this.user2, this.user3, this.user4, this.user5];

  constructor() {}

  ngOnInit() {}
}
