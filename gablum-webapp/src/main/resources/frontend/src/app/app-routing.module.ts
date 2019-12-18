import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TimerComponent } from './scheduler/timer/timer.component';
import { AuthGuardService } from './services/auth-guard.service';
import { BuyerGuardService } from './services/buyer-guard.service';
import { SellerGuardService } from './services/seller-guard.service';
import { TeamComponent } from './team/team.component';

import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule),
    // canLoad: [AuthGuardService]
  },
  // {
  //   path: 'console',
  //   loadChildren: () => import('./console/console.module').then(module => module.ConsoleModule)
  // },
  // {
  //   path: 'history',
  //   loadChildren: () => import('./history/history.module').then(module => module.HistoryModule)
  // },
  {
    path: 'inbox',
    loadChildren: () => import('./inbox/inbox.module').then(module => module.InboxModule),
    canLoad: [AuthGuardService]
  },
  // {
  //   path: 'calendar',
  //   loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
  // },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'register-admin',
    loadChildren: () => import('./register-admin/register-admin.module').then(m => m.RegisterAdminModule)
  },
  {
    path: 'float-proposal',
    loadChildren: () => import('./new-proposal/new-proposal.module').then(m => m.NewProposalModule),
    canLoad: [AuthGuardService, BuyerGuardService]
  },
  {
    path: 'auctions',
    loadChildren: () => import('./auction/auction.module').then(m => m.AuctionModule)
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./app.module').then(m => m.AppModule)
  // },
  {
    path: 'contracts',
    loadChildren: () => import('./contracts/contracts.module').then(m => m.ContractsModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'timer',
    loadChildren: () => import( './scheduler/scheduler.module').then(m => m.SchedulerModule)
  },
  {
    path: 'browse',
    loadChildren: () => import( './browse-proposals/browse-proposals.module').then(m => m.BrowseProposalsModule),
    canLoad: [SellerGuardService]
  },
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'team',
    component: TeamComponent,
    pathMatch: 'full'
  },

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
