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
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

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
  roles = ['Buyer', 'Seller', 'Both'];

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
        if (message.dest === '@all' || message.dest === RegisterPageComponent.msgKey) {
          const data = message.data;
          if ('registrationResult' in data) {
            const registrationToken: any = data.registrationResult;
            this.logger.log(registrationToken);
            if (registrationToken === undefined ||
              registrationToken === null ||
              !registrationToken.ok) {
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
                'Registered successfully, please login',
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
  // sendMail(){

  // }
  nameErrorMessage1() {
    return this.name.hasError('required') ? '*You must enter a name' :
    this.name.hasError('maxlength') ? '*More than 30 characters not allowed' :
            '';
  }

  emailErrorMessage2() {
    return this.email.hasError('required') ? '*Email required' :
    this.email.hasError('email') ? '*Not a valid email' :
    '';
  }

  phoneErrorMessage3() {
    return this.phone.hasError('required') ? '*Required' :
        this.phone.hasError('pattern') ? '*Not a valid phone no' :
            '';
  }

  companyErrorMessage4() {
    return this.companyName.hasError('required') ? '*Required' :
    '';
  }

  passwordErrorMessage6() {
    return this.password.hasError('required') ? '*You must enter a Password' :
        this.password.hasError('pattern') ? '*Not a valid Password' :
        this.password.hasError('minlength') ? '*Minimum 5 characters' :
            '';
  }

  businessLicenseErrorMessage7() {
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
    this.logger.log(' Registeration Form Details ' , this.registrationForm.value, this.businessDomain);
    const registerProfile: RegisterRequest = this.registrationForm.value;
    if (this.registrationForm.value.role === 'buyer') {
      registerProfile.role = [roleBuyer];
    }
    if (this.registrationForm.value.role === 'seller') {
      registerProfile.role = [roleSeller];
    }
    if (this.registrationForm.value.role === 'both') {
      registerProfile.role = [roleBuyer, roleSeller];
    }
    this.registrationService.register(registerProfile);
    this.router.navigate(['/register']);
  }

  cancel() {
    this.router.navigate(['']);
  }
}
