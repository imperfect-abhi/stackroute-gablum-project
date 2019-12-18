import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';


const routes: Routes = [
  {
    path: ':email',
    component: PublicProfileComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    component: ProfilePageComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
