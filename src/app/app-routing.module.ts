import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasinmazComponent } from './components/tasinmaz/tasinmaz.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:UsersComponent},
  {path:"users", component:UsersComponent},
  {path:"users/tasinmaz/:tID", component:TasinmazComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
