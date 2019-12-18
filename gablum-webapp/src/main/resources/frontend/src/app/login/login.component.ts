import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NetworkingService } from '../services/networking.service';
import { LoginToken } from '../interfaces/login-token';
import { LoginDataService } from '../services/login-data.service';
import { CommunicatorService } from '../services/communicator.service';
import { AuthenticationService } from '../services/authentication.service';
import { LoggerService } from '../services/logger.service';
import { ProfileDataService } from '../services/profile-data.service';
import { MatDialogRef } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Profile } from '../interfaces/profile';
// import { MatError } from '@angular/material';
// import { UserRole } from '../interfaces/user-role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public static messageKey = 'login-component';
  public userProfile: Profile;
  public userRole = new Array();

  get password() {
    return this.loginForm.get('password');
  }
  get userName() {
    return this.loginForm.get('username');
  }
  constructor(
    private router: Router,
    private loginService: LoginDataService,
    private comms: CommunicatorService,
    private logger: LoggerService,
    // private user: UserRole,
    private auth: AuthenticationService,
    private profile: ProfileDataService,
    public dialogRef: MatDialogRef<LoginComponent>, ) {
      this.comms.getMessages().subscribe(message => {
        if (message.dest === '@all' || message.dest === LoginComponent.messageKey) {
          const data = message.data;
          if ('loginResult' in data) {
            const loginToken = data.loginResult.accessToken;
            this.logger.log(loginToken);
            if (loginToken === undefined || loginToken === null) {

            } else if (loginToken === 401) {
              auth.setAuthenticated(false);
              this.loginError = true;
              this.loginErrorMesage = 'Invalid Credentials';
              this.logger.log(this.loginErrorMesage);
            } else if (loginToken === 500) {
              auth.setAuthenticated(false);
              this.loginError = true;
              this.loginErrorMesage = 'Unknown Error, try again later';
            } else {
              auth.setAuthenticated(true);
              auth.authChanged();
              this.loginError = false;
              this.profile.getUserProfileByEmail('@all', 'profile');
              if ('userProfile' in data) {
                this.userProfile = data.userProfile;
                this.userRole = this.userProfile.role;
                if ( this.userRole[0].role === 'Admin') {
                  this.router.navigate(['/grafana']);
                } else {
                  this.router.navigate(['/dashboard']);
                }
              }
            }
          }
        }
      });
  }

  public loginError = false;
  public loginErrorMesage = '';

  check = true;

  loginForm = new FormGroup({
    username : new FormControl('', Validators.compose([Validators.required,
      Validators.minLength(3)])),
    password : new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[&@$_.#!a-zA-Z0-9]{0,20}$'),
    Validators.minLength(3)]))
  });

  ngOnInit() {
    this.profile.getUserProfileByEmail(
      LoginComponent.messageKey,
      'userProfile'
    );
  }

  getErrorMessage1() {
    return this.userName.hasError('required') ? '*You must enter a Username' :
        // this.userName.hasError('pattern') ? '*Not a valid Username' :
        this.userName.hasError('minlength') ? '*Minimum 3 characters' :
            '';
  }

  getErrorMessage2() {
    return this.password.hasError('required') ? '*You must enter a Password' :
        this.password.hasError('pattern') ? '*Not a valid Password' :
        this.password.hasError('minlength') ? '*Minimum 3 characters' :
            '';
  }
  onSubmit() {
    this.loginService.login(this.loginForm.value)
    .subscribe(res => {
      this.dialogRef.close();
      this.comms.postMessage(
        this,
        '@all',
        {loginResult: {accessToken: res}}
      );
    },
    err => {
      this.logger.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.comms.postMessage(
            this,
            '@all',
            {loginResult: {accessToken: err.status}}
          );
        } else {
          this.comms.postMessage(
            this,
            '@all',
            {loginResult: {accessToken: 500}}
          );
        }
      }
    });
  }
  OnSignUp() {
    this.router.navigate(['/register']);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
