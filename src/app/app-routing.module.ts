import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TasinmazComponent } from './components/tasinmaz/tasinmaz.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UsersComponent } from './components/users/users.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full", component:UsersComponent},
  {path:"users", component:UsersComponent},
  {path:"users/tasinmaz/:tID", component:TasinmazComponent},
  {path:"auth/register", component:UserAddComponent,canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
