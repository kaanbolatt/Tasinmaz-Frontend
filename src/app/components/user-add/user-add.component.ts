import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.css"],
})
export class UserAddComponent implements OnInit {
  userAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.createUserAddForm();
  }

  createUserAddForm() {
    this.userAddForm = this.formBuilder.group({
      uName: ["", Validators.required],
      uSurname: ["", Validators.required],
      uMail: ["", [Validators.email, Validators.required]],
      uNumber: ["", Validators.required],
      uAdress: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  add() {
    if (this.userAddForm.valid) {
      let userModel = Object.assign({}, this.userAddForm.value);
      this.userService.add(userModel).subscribe((data) => {
        console.log(data);
        this.toastrService.success("Kullanıcı eklendi!", "Başarılı!");
      });
    } else {
      this.toastrService.error("Formunuz eksik.", "Dikkat!");
    }
  }
}
