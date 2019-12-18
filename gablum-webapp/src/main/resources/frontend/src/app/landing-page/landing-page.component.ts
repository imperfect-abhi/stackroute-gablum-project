import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import { NetworkingService } from '../services/networking.service';
import { LoginToken } from '../interfaces/login-token';
import { LoginDataService } from '../services/login-data.service';
import { CommunicatorService } from '../services/communicator.service';
import { TranslateService } from '@ngx-translate/core';
import { IntlService } from '../services/intl.service';

declare const H: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public static messageKey = 'login-component';
  public showCookieBanner = true;

  get password() {
    return this.loginForm.get('password');
  }
  get userName() {
    return this.loginForm.get('username');
  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.compose([Validators.required,
    Validators.minLength(3)])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9-.]*$'),
    Validators.minLength(3)]))
  });

  constructor(
    private router: Router,
    private loginService: LoginDataService,
    private comms: CommunicatorService,
    private translate: TranslateService,
    private intl: IntlService) {
      if (localStorage.getItem('showcookie')) {
        this.showCookieBanner = false;
      }
      translate.addLangs(['en', 'hi']);
      translate.setDefaultLang('hi');
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|hi/) ? browserLang : 'en');
      this.comms.getMessages().subscribe(message => {
        if (message.dest === '@all' || message.dest === LandingPageComponent.messageKey) {
          const data = message.data;
          if ('loginResult' in data) {
            const loginToken: LoginToken = data.loginResult.accessToken;
            // console.log(loginToken.accessToken);
            if (loginToken === undefined || loginToken === null) {

            } else {
              this.router.navigate(['dashboard']);
            }
          }

          if ('langChanged' in data) {
            translate.use(intl.getLang());
          }
        }
      });
    }

    public heroText = 'A B2B Auctioning platform, where quality meets you';



  ngOnInit() {
    if (H) {
      const platform = new H.service.Platform({
        apikey: '4_7vNvF5vudZJukEqr_3ofdYEDJnqQWx1etfR53nj-k'
      });

      const maptypes = platform.createDefaultLayers();
      const coords = { lat: 12.93363, lng: 77.61469 };

      const map = new H.Map(
        document.getElementById('mapContainer'),
        maptypes.vector.normal.map,
        {
          zoom: 16,
          center: coords,
          pixelRatio: window.devicePixelRatio || 1
        });

      window.addEventListener('resize', () => map.getViewPort().resize());

      const svgMarkup = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">b</text></svg>';

      // Create an icon, an object holding the latitude and longitude, and a marker:
      const icon = new H.map.Icon(svgMarkup);
      const marker = new H.map.Marker(coords, { icon });
      map.addObject(marker);
      map.setCenter(coords);
    }
  }
  getErrorMessage1() {
    return this.userName.hasError('required') ? '*You must enter a Username' :
      // this.userName.hasError('pattern') ? '*Not a valid Username' :
      this.userName.hasError('minlength') ? '*Minimum 8 characters' :
        '';
  }

  getErrorMessage2() {
    return this.password.hasError('required') ? '*You must enter a Password' :
      this.password.hasError('pattern') ? '*Not a valid Password' :
        this.password.hasError('minlength') ? '*Minimum 8 characters' :
          '';
  }

  onSubmit() {
    // this.networking.postData<LoginToken>()
    this.loginService.login(this.loginForm.value);
    // this.router.navigate(['/dashboard']);
  }

  hideCookies(accept = true) {
    this.showCookieBanner = false;
    if (accept) {
      localStorage.setItem('showcookie', 'yes');
    }
    // const x = document.getElementById('cookie-confirmation-outer');
    // if (x.style.display === 'none') {
    //   x.style.display = 'block';
    // } else {
    //   x.style.display = 'none';
    // }
  }

}

