import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditProfileDialogComponent} from '../edit-profile-dialog/edit-profile-dialog.component';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { Profile } from 'src/app/interfaces/profile';
import { ProfileDataService } from 'src/app/services/profile-data.service';
import { LoggerService } from 'src/app/services/logger.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  public static messageKey = 'proposals-list-component';

  @Input() profile: Profile;

  public roles: string;

  constructor(
    private dialog: MatDialog,
    private profileDataService: ProfileDataService,
    private comms: CommunicatorService,
    private logger: LoggerService,
    private auth: AuthenticationService) {
      comms.getMessages().subscribe(msg => {
        if (msg.dest === ProfilePageComponent.messageKey || msg.dest === '@all') {
          const data = msg.data;

          if ('profile' in data) {
            this.profile = data.profile;
            this.roles = this.profile.role.map(r => r.role).join(', ');
            this.logger.log(this.profile);
          }
        }
      });
    }

  ngOnInit() {
    this.profileDataService.getUserProfileByEmail(ProfilePageComponent.messageKey, 'profile');
  }
  onClick() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    this.dialog.open(EditProfileDialogComponent,
      {
        width: '60%',
        data: this.profile
      }
    );
  }
}
