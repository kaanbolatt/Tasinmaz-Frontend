import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { Router, RouterModule, Routes } from "@angular/router";
import { Route } from "@angular/compiler/src/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  go() {
    this.router.navigateByUrl("tasinmazlist");
  }
  ngOnInit(): void {
    this.createLoginForm();
    if(localStorage.getItem("token") != null){
      this.router.navigateByUrl("tasinmazlist");
    }
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          this.toastrService.info(response.message);
          localStorage.setItem("token", response.data.token);
          this.go();
        },
        (responseError) => {
          //console.log(responseError)
          this.toastrService.error(responseError.error);
        }
      );
    }
  }

}
