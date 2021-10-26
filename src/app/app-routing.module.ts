import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogComponent } from './components/log/log.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { TasinmazAddComponent } from './components/tasinmazs/tasinmaz-add/tasinmaz-add.component';
import { TasinmazUpdateComponent } from './components/tasinmazs/tasinmaz-update/tasinmaz-update.component';
import { TasinmazComponent } from './components/tasinmazs/tasinmaz/tasinmaz.component';
import { UserAddComponent } from './components/user/user-add/user-add.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { UsersComponent } from './components/user/users/users.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"userlist",pathMatch:"full", component:UsersComponent,canActivate:[LoginGuard]},
  {path:"tasinmazlist",pathMatch:"full", component:TasinmazComponent,canActivate:[LoginGuard]},
  {path:"useradd", component:UserAddComponent,canActivate:[LoginGuard]},
  {path:"tasinmazadd", component:TasinmazAddComponent,canActivate:[LoginGuard]},
  {path:"", component:LoginComponent},
  {path:"tasinmazupdate/:id", component:TasinmazUpdateComponent, canActivate:[LoginGuard]},
  {path:"userupdate/:id", component:UserUpdateComponent, canActivate:[LoginGuard]},
  {path:"loglist",pathMatch:"full", component:LogComponent,canActivate:[LoginGuard]},
  {path:"olmap", pathMatch:"full", component:MapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
