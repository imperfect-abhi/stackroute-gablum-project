import { Component, OnInit } from '@angular/core';
import { Proposal } from 'src/app/interfaces/proposal';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { ProposalsDataService } from 'src/app/services/proposals-data.service';
import { LoggerService } from 'src/app/services/logger.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Profile } from 'src/app/interfaces/profile';
import { ProfileDataService } from 'src/app/services/profile-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inbox-page',
  templateUrl: './inbox-page.component.html',
  styleUrls: ['./inbox-page.component.css']
})
export class InboxPageComponent implements OnInit {
  public static messageKey = 'InboxPageComponent';
  proposals: Proposal[];
  displayedColumns: string[] = ['productName', 'businessSubDomain', 'createdBy', 'createdOn', 'quantity', 'view'];
  dataSource;
  userProfile: Profile;
  currentSubDomain;

  constructor(
    private comms: CommunicatorService,
    private proposalDataService: ProposalsDataService,
    private logger: LoggerService,
    private auth: AuthenticationService,
    private user: ProfileDataService,
    private router: Router
    ) {
      comms.getMessages().subscribe(msg => {
        if (msg.dest === InboxPageComponent.messageKey || msg.dest === '@all' ) {
          const data = msg.data;
          if ('profile' in data) {
            try {
              this.userProfile = data.profile;
              // logger.log('data---->', data);
              this.currentSubDomain = this.userProfile.businessSubDomain;
              // logger.log('SubDomain---->', this.currentSubDomain);
              this.proposalDataService.getProposalsBySubDomain(this.currentSubDomain, InboxPageComponent.messageKey, 'Allproposals');
             } catch (err) {
              this.logger.log(err);
            }

          }
          // this.userProfile = auth.getProfileData();
          // logger.log('user profile data --------->' , JSON.stringify(this.userProfile));
          // this.currentSubDomain = this.userProfile.businessSubDomain;
          // logger.log('current sub domain ------>', this.currentSubDomain);
          if ('Allproposals' in data) {
            this.proposals = data.Allproposals;
            logger.log('data from get api call for filtered data ---->' , this.proposals );
            this.dataSource = this.proposals;
          }
        }
      });
     }

  ngOnInit() {
    this.user.getUserProfileByEmail(
      InboxPageComponent.messageKey,
      'profile');
  }
  onClick() {
    this.router.navigate(['/browse']);
  }

  loadProfile(email) {
    this.router.navigate(['/profile', email]);
  }

}
