import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasinmazComponent } from './components/tasinmaz/tasinmaz.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:UsersComponent},
  {path:"users", component:UsersComponent},
  {path:"users/tasinmaz/:tID", component:TasinmazComponent},
  {path:"users/add", component:UserAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
