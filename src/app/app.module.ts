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
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from "./interceptors/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TasinmazComponent,
    NaviComponent,
    VatAddedPipe,
    FilterPipePipe,
    UserAddComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
      }),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
