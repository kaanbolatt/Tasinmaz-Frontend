import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UsersComponent } from "./components/user/users/users.component";
import { TasinmazComponent } from "./components/tasinmazs/tasinmaz/tasinmaz.component";
import { VatAddedPipe } from "./pipes/vat-added.pipe";
import { FilterPipePipe } from "./pipes/filter-pipe.pipe";
import { UserAddComponent } from "./components/user/user-add/user-add.component";
import { ToastrModule } from "ngx-toastr";
import { LoginComponent } from "./components/login/login.component";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { TasinmazAddComponent } from "./components/tasinmazs/tasinmaz-add/tasinmaz-add.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgxPaginationModule } from "ngx-pagination";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { MatDialogModule} from "@angular/material/dialog";
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { TasinmazUpdateComponent } from './components/tasinmazs/tasinmaz-update/tasinmaz-update.component';
import { LogComponent } from './components/log/log.component'


@NgModule({
  declarations: [
    AppComponent,
    TasinmazComponent,
    VatAddedPipe,
    FilterPipePipe,
    UserAddComponent,
    LoginComponent,
    TasinmazAddComponent,
    UsersComponent,
    UserUpdateComponent,
    TasinmazUpdateComponent,
    LogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
    }),
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ConfirmationPopoverModule.forRoot({confirmButtonType:'danger'}),
    MatDialogModule


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent,UsersComponent,TasinmazComponent],
  entryComponents:[TasinmazComponent]
})
export class AppModule {}
