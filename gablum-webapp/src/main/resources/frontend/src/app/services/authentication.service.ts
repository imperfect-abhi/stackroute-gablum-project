import { Injectable } from '@angular/core';
import { ProfileDataService } from './profile-data.service';
import { CommunicatorService } from './communicator.service';
import { LoggerService } from './logger.service';
import { User } from '../interfaces/user';
import { Profile } from '../interfaces/profile';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginToken: string;
  private roles: string[];
  private isAuthenticated = false;
  private profileData: Profile;

  constructor(
    private profile: ProfileDataService,
    private comms: CommunicatorService,
    private logger: LoggerService,
    private router: Router
    ) {
      comms.getMessages().subscribe(msg => {
        if (msg.dest === '@all') {
          const data = msg.data;
          if ('profile' in data) {
            this.profileData = data.profile;
            if (
              this.profileData === undefined ||
              this.profileData === null ||
              this.profileData.role === null ||
              this.profileData.role.length === 0) {
                this.clearProfile();
            } else {
              this.logger.log(this.profile);
              this.setProfile(this.profileData);
              this.refreshRoles();
              if (this.isAdmin()) {
                this.router.navigate(['/admin']);
              }
            }
          }
        }
      });
      this.refreshProfile();
      this.refreshRoles();
  }

  setAuthenticated(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
    this.authChanged();
  }

  hasRole(role: string) {
    try {
      return (this.roles.indexOf(role) > -1);
    } catch (err) {
      return false;
    }
  }

  isBuyer() {
    return this.hasRole('buyer');
  }

  isSeller() {
    return this.hasRole('seller');
  }

  isAdmin() {
    return this.hasRole('admin');
  }
  getAuthenticated() {
    return this.isAuthenticated;
  }

  setProfile(profile: Profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
    this.isAuthenticated = true;
    this.authChanged();
  }

  refreshProfile() {
    const profileStr = localStorage.getItem('profile');
    if (profileStr !== undefined && profileStr !== null) {
      try {
        this.profileData = JSON.parse(profileStr);
        this.isAuthenticated = true;
        this.authChanged();
        return this.profileData;
      } catch (err) {
        this.logger.log(err);
        this.isAuthenticated = false;
        this.authChanged();
        return null;
      }
    }
    this.isAuthenticated = false;
    this.authChanged();
    return null;
  }

  refreshRoles() {
    try {
      this.roles = this.profileData.role.map(r => r.role);
      this.logger.log(this.roles);
    } catch (error) {
      this.logger.log(error);
    }
  }

  clearProfile() {
    localStorage.removeItem('profile');
    this.isAuthenticated = false;
    this.profileData = null;
    this.roles = [];
    this.authChanged();
  }

  authChanged() {
    this.comms.postMessage(
      this, '@all', {authChanged: ''}
    );
  }

  getProfileData() {
    return this.profileData;
  }
}
