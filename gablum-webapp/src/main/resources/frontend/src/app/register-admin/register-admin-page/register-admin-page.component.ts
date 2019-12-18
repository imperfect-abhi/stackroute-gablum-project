import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterToken } from '../../interfaces/register-token';
import { RegisterDataService } from '../../services/register-data.service';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/interfaces/register-request';
import { UserRole } from 'src/app/interfaces/user-role';
import { LoggerService } from 'src/app/services/logger.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-register-admin-page',
  templateUrl: './register-admin-page.component.html',
  styleUrls: ['./register-admin-page.component.css']
})
export class RegisterAdminPageComponent implements OnInit {

  public static msgKey = 'regPage-component';

  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get address() {
    return this.registrationForm.get('address');
  }

  get phone() {
    return this.registrationForm.get('phone');
  }

  get companyName() {
    return this.registrationForm.get('companyName');
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get businessLicense() {
    return this.registrationForm.get('businessLicense');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get role() {
    return this.registrationForm.get('role');
  }

  get businessDomain() {
    return this.registrationForm.get('businessDomain');
  }
  get businessSubDomain() {
    return this.registrationForm.get('businessSubDomain');
  }

  subDomains = ['Raw material', 'Crops', 'Machinery'];
  roles = ['Admin'];

  registrationForm = new FormGroup({
    name : new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
    email : new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])),
    address : new FormControl(''),
    phone : new FormControl('', Validators.compose([Validators.required,
      Validators.pattern('^[6-9]{1}[0-9]{9}$')])),
    companyName : new FormControl('', Validators.maxLength(80)),
    // userName : new FormControl('', Validators.compose([Validators.required,
    //   Validators.pattern('/^[&@$_.#!]{0,1}[a-zA-Z0-9]+[&@$_.#!]{0,1}[a-zA-Z0-9]+[&@$_.#!]{0,1}$/'),
    //   Validators.maxLength(30)])),


    businessLicense : new FormControl('', Validators.compose([Validators.required,
      Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-7])([A-Z]{5})([0-9]{4})([A-Z]{1}[1-9A-Z]{1})([Z]{1})([0-9A-Z]{1})+$')])),

// avoid validation for the time being. its irritating everytime to register.

//       businessLicense : new FormControl(''),
      password : new FormControl('', Validators.compose([Validators.required,
      Validators.pattern('^[&@$_.#!a-zA-Z0-9]{0,20}$'),
      Validators.minLength(5)])),
    role : new FormControl('', Validators.required),
    businessDomain : new FormControl(''),
    businessSubDomain : new FormControl('', Validators.required)
  });
  constructor(
    private router: Router,
    private registrationService: RegisterDataService,
    private logger: LoggerService,
    private comms: CommunicatorService,
    private snackbar: MatSnackBar) {
      this.comms.getMessages().subscribe(message => {
        if (message.dest === '@all' || message.dest === RegisterAdminPageComponent.msgKey) {
          const data = message.data;
          if ('registrationResult' in data) {
            const registrationToken: RegisterToken = data.registrationResult;
            this.logger.log(registrationToken);
            if (registrationToken === undefined ||
              registrationToken === null ||
              !registrationToken.isOk) {
              this.snackbar.open(
                'Registration failed',
                '',
                {
                  duration: 5000
                }
              );
            } else {
              this.logger.log('registered');
              this.router.navigate(['/']);
              this.snackbar.open(
                'Registered successfully as ' + this.email,
                '',
                {
                  duration: 5000
                }
              );
            }
          }
        }
      });
  }

  ngOnInit() {
  }
  getErrorMessage1() {
    return this.name.hasError('required') ? '*You must enter a name' :
    this.name.hasError('maxlength') ? '*More than 30 characters not allowed' :
            '';
  }

  getErrorMessage2() {
    return this.email.hasError('required') ? '*Email required' :
    this.email.hasError('email') ? '*Not a valid email' :
    '';
  }

  getErrorMessage3() {
    return this.phone.hasError('required') ? '*Required' :
        this.phone.hasError('pattern') ? '*Not a valid phone no' :
            '';
  }

  getErrorMessage4() {
    return this.companyName.hasError('required') ? '*Required' :
    '';
  }

  getErrorMessage5() {
    return this.userName.hasError('required') ? '*You must enter a Username' :
        this.userName.hasError('pattern') ? '*Not a valid Username' :
        this.userName.hasError('maxlength') ? '*Maximum 30 characters only' :
            '';
  }

  getErrorMessage6() {
    return this.password.hasError('required') ? '*You must enter a Password' :
        this.password.hasError('pattern') ? '*Not a valid Password' :
        this.password.hasError('minlength') ? '*Minimum 5 characters' :
            '';
  }

  getErrorMessage7() {
    return this.businessLicense.hasError('required') ? '*Required' :
        this.businessLicense.hasError('pattern') ? '*Invalid GSTIN no.' :
        '';
  }

  getErrorMessage8() {
    return this.role.hasError('required') ? '*Required' :
    '';
  }

  onSubmit() {
    const roleBuyer: UserRole = {
      role: 'buyer',
      id: 1
    };
    const roleSeller: UserRole = {
      role: 'seller',
      id: 2
    };
    const roleAdmin: UserRole = {
      role: 'admin',
      id: 3
    };
    const registerProfile: RegisterRequest = this.registrationForm.value;
    // if (this.registrationForm.value.role === 'buyer') {
    //   registerProfile.role = [roleBuyer];
    // }
    // if (this.registrationForm.value.role === 'seller') {
    //   registerProfile.role = [roleSeller];
    // }
    // if (this.registrationForm.value.role === 'both') {
    //   registerProfile.role = [roleBuyer, roleSeller];
    // }
    registerProfile.role = [roleAdmin];
    this.registrationService.register(registerProfile);
    this.router.navigate(['']);
  }
}
