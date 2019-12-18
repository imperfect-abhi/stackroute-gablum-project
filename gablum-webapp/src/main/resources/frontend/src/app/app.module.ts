// import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppCommonModule } from './common/common.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HistoryModule } from './history/history.module';
import { InboxModule } from './inbox/inbox.module';
import { CalendarModule } from './calendar/calendar.module';
import { ProfileModule } from './profile/profile.module';
import { RegisterModule } from './register/register.module';
import { NewProposalModule } from './new-proposal/new-proposal.module';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { ConsoleModule } from './console/console.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ContractsModule } from './contracts/contracts.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuctionModule } from './auction/auction.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { InterceptorService } from './services/interceptor.service';
import { BrowseProposalsModule } from './browse-proposals/browse-proposals.module';
import { AdminModule } from './admin/admin.module';
import { TeamComponent } from './team/team.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NotFoundComponent } from './not-found/not-found.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    TeamComponent,
    NotFoundComponent
  ],
  imports: [
    // BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DashboardModule,
    AppCommonModule,
    HistoryModule,
    InboxModule,
    CalendarModule,
    ProfileModule,
    RegisterModule,
    NewProposalModule,
    CommonModule,
    PortalModule,
    ConsoleModule,
    HttpClientModule,
    AuctionModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ContractsModule,
    SchedulerModule,
    RouterModule,
    FormsModule,
    BrowseProposalsModule,
    AdminModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
