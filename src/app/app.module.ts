import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
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

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TasinmazComponent,
    NaviComponent,
    VatAddedPipe,
    FilterPipePipe,
    UserAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      progressBar:true
      }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
