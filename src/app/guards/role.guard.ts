import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { UsersComponent } from "../components/user/users/users.component";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private userComponent: UsersComponent
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userComponent.isAdmin()) {
      console.log("bu adam admin");
      return true;
    } else {
      console.log("bu adam user");
      // this.router.navigate([""]);
      return false;
    }
  }
}
