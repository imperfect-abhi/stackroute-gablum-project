import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AuctionsListComponent } from './auctions-list/auctions-list.component';
import { MaterialModule } from '../material/material.module';
import { ProposalsListComponent } from './proposals-list/proposals-list.component';
import { NewProposalCardComponent } from './new-proposal-card/new-proposal-card.component';
import { ProposalCardDialogComponent } from './proposal-card-dialog/proposal-card-dialog.component';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { ConsoleModule } from '../console/console.module';
import { AuctionModule } from '../auction/auction.module';
import { SellersListDialogComponent } from './sellers-list-dialog/sellers-list-dialog.component';
import { GuestProposalListComponent } from './guest-proposal-list/guest-proposal-list.component';
import { ExtendProposalDialogComponent } from './extend-proposal-dialog/extend-proposal-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SellerProposalCardComponent } from './seller-proposal-card/seller-proposal-card.component';
import { AuctionStartDialogComponent } from '../auction/auction-start-dialog/auction-start-dialog.component';
import { MatDatepickerModule } from '@angular/material';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ProposalSellerDialogComponent } from './proposal-seller-dialog/proposal-seller-dialog.component';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { HttpClientModule, HttpClient } from '@angular/common/http';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);

@NgModule({
  declarations: [
    DashboardComponent,
    AuctionsListComponent,
    ProposalsListComponent,
    NewProposalCardComponent,
    ProposalCardDialogComponent,
    SellersListDialogComponent,
    GuestProposalListComponent,
    ExtendProposalDialogComponent,
    SellerProposalCardComponent,
    DeleteConfirmationDialogComponent,
    ProposalSellerDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SchedulerModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ConsoleModule,
    AuctionModule,
    MatDatepickerModule,
    // HttpClientModule,
    // TranslateModule.forChild({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // })
  ],
  entryComponents: [
    ProposalCardDialogComponent,
    SellersListDialogComponent,
    ExtendProposalDialogComponent,
    AuctionStartDialogComponent,
    DeleteConfirmationDialogComponent,
    ProposalSellerDialogComponent
  ],
  exports: [
    SellerProposalCardComponent
  ]
})
export class DashboardModule { }
