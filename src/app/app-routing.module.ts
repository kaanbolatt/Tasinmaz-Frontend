import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TasinmazAddComponent } from './components/tasinmaz-add/tasinmaz-add.component';
import { TasinmazComponent } from './components/tasinmaz/tasinmaz.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UsersComponent } from './components/users/users.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"userlist",pathMatch:"full", component:UsersComponent,canActivate:[LoginGuard]},
  {path:"tasinmazlist",pathMatch:"full", component:TasinmazComponent,canActivate:[LoginGuard]},
  {path:"useradd", component:UserAddComponent,canActivate:[LoginGuard]},
  {path:"tasinmazadd", component:TasinmazAddComponent,canActivate:[LoginGuard]},
  {path:"", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
