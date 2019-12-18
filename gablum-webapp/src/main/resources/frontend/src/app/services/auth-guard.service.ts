import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  canLoad() {
    if (this.auth.getAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
