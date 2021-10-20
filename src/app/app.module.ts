import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UsersComponent } from "./components/users/users.component";
import { TasinmazComponent } from "./components/tasinmaz/tasinmaz.component";
import { NaviComponent } from "./components/navi/navi.component";
import { VatAddedPipe } from "./pipes/vat-added.pipe";
import { FilterPipePipe } from "./pipes/filter-pipe.pipe";
import { UserAddComponent } from "./components/user-add/user-add.component";
import { ToastrModule } from "ngx-toastr";
import { LoginComponent } from "./components/login/login.component";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { TasinmazAddComponent } from "./components/tasinmaz-add/tasinmaz-add.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgxPaginationModule } from "ngx-pagination";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";




@NgModule({
  declarations: [
    AppComponent,
    TasinmazComponent,
    NaviComponent,
    VatAddedPipe,
    FilterPipePipe,
    UserAddComponent,
    LoginComponent,
    TasinmazAddComponent,
    UsersComponent
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


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent,UsersComponent,TasinmazComponent],
  entryComponents:[TasinmazComponent]
})
export class AppModule {}
