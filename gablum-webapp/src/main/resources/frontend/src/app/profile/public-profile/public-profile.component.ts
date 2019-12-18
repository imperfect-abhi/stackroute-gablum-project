import { Component, OnInit } from '@angular/core';
import { ProfileDataService } from 'src/app/services/profile-data.service';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { Profile } from 'src/app/interfaces/profile';
import { LoggerService } from 'src/app/services/logger.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {
  public static messageKey = 'public-profile-component';
  public profile: Profile;
  public roles: string;
  public previousRoute: string;
  public profileEmail: string;
  public rating: number;

  constructor(
    public profileDataService: ProfileDataService,
    public comms: CommunicatorService,
    private logger: LoggerService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private location: Location
  ) {
    console.log('In public profile component');
    this.activatedRoute.paramMap
      .subscribe((params: Params) => {
        this.profileEmail = params.get('email');
      });
    this.profileEmail = environment.profileUrl + '/' + this.profileEmail;
    comms.getMessages().subscribe(msg => {
      if (msg.dest === PublicProfileComponent.messageKey || msg.dest === '@all') {
        const data = msg.data;
        if ('profile' in data) {
          this.profile = data.profile;
          this.roles = this.profile.role.map(r => r.role).join(', ');
          this.logger.log(this.profile);
        }
      }
    });
    this.rating = Math.round( (3.3 + (Math.random() * 1.5) ) * 10 ) / 10;
   }
  ngOnInit() {
    this.profileDataService.getUserProfileByEmailWithUrl(this.profileEmail, PublicProfileComponent.messageKey, 'profile');
  }

  onClick() {
    this.location.back();
  }
}
