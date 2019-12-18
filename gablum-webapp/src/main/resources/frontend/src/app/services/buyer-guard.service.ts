import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BuyerGuardService implements CanLoad {

  constructor(private auth: AuthenticationService) { }

  canLoad() {
    return this.auth.isBuyer();
  }
}
