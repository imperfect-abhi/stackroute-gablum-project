import { Component, OnInit, Output, Input, OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileDataService } from 'src/app/services/profile-data.service';
import { Profile } from 'src/app/interfaces/profile';
import { LoggerService } from 'src/app/services/logger.service';
import { LoginToken } from 'src/app/interfaces/login-token';
import { Router } from '@angular/router';
import { LoginDataService } from 'src/app/services/login-data.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../login/login.component';
import { IntlService } from 'src/app/services/intl.service';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { StompSubscription } from '@stomp/stompjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public static messageKey = 'NavbarComponent';
  public isLoggedIn = false;
  public roles: string;
  public alertMessage = 0;
  public alertFlag: boolean;
  public wsRef: StompSubscription;

  @Output() public menuToggled = new EventEmitter();

  @Input() profile: Profile;

  constructor(
    private comms: CommunicatorService,
    private auth: AuthenticationService,
    private profileDataService: ProfileDataService,
    private logger: LoggerService,
    private router: Router,
    private login: LoginDataService,
    public dialog: MatDialog,
    private lang: IntlService,
    private alertService: AlertServiceService
  ) {
    this.isLoggedIn = auth.getAuthenticated();
    this.comms.getMessages().subscribe(message => {
      if (message.dest === '@all' || message.dest === NavbarComponent.messageKey) {
        const data = message.data;
        if ('authChanged' in data) {
          this.isLoggedIn = auth.getAuthenticated();
          // this.logger.log(auth.getProfileData());
          this.profile = auth.getProfileData();
        }

        if ('profile' in data) {
          this.profile = data.profile;
          this.roles = this.profile.role.map(r => r.role).join(', ');
          this.logger.log(this.profile);
        }

        if ('logoutResult' in data) {
          const logoutResult: LoginToken = data.logoutResult.accessToken;
          if (logoutResult === undefined || logoutResult === null) {

          } else {
            auth.setAuthenticated(false);
            auth.clearProfile();
            this.router.navigate(['/']);
            logger.log(logoutResult);
          }
        }
        if ('newProposalAlert' in data) {
          const array = JSON.parse(data.newProposalAlert.body);
          if (array.indexOf(this.profile.email) >= 0 ) {
             this.alertMessage = this.alertMessage + 1 ;
          }
        }
      }
    });
  }

  ngOnInit() {
    if (!this.alertService.stompClient.connected) {
      this.alertService.connect(message => this.subscribe());
    } else {
      this.subscribe();
      this.alertService.storedSubcriptions = message => this.subscribe();
    }
  }


  menuClicked(event) {
    this.menuToggled.emit(event);
  }

  logout() {
    this.alertService.disconnect();
    this.login.logout();
  }
  opDialog() {
    this.dialog.open(LoginComponent, {
      width: '60%',
    });
  }

  changeLang(lang: string) {
    this.lang.setLang(lang);
  }
  alert() {
    this.alertMessage = 0;
    this.router.navigate(['/inbox']);
  }


  subscribe() {
    this.alertService.subscribe(
      '/topic/proposalAlert/',
      NavbarComponent.messageKey,
      'newProposalAlert');
  }

}
