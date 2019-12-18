import { Injectable } from '@angular/core';
import { CommunicatorService } from './communicator.service';
import { NetworkingService } from './networking.service';
import { Profile } from '../interfaces/profile';
import { environment } from 'src/environments/environment';
import { NavLink } from '../interfaces/navlink';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {

  private profileUrl: string;
  private navlinkUrl: string;

  constructor(
    private comms: CommunicatorService,
    private networking: NetworkingService
  ) {
    this.profileUrl = environment.profileUrl;
    this.navlinkUrl = environment.navlinkUrl;
  }

  getUserProfileByEmail(dest, key) {
    this.networking.getData<Profile>(this.profileUrl, dest, key);
  }

  getUserProfileByEmailWithUrl(url: string, dest, key) {
    this.networking.getData<Profile>(url, dest, key);
  }

  editUserProfile(dest, data, key) {
    return this.networking.patchData<Profile>(this.profileUrl, dest, data, key);
  }

  getNavLinks(dest, key) {
    this.networking.getData<NavLink[]>(this.navlinkUrl, dest, key);
  }
}
