import { Component, OnInit } from '@angular/core';
import { ProfileDataService } from './services/profile-data.service';
import { AuthenticationService } from './services/authentication.service';
import { CommunicatorService } from './services/communicator.service';
import { LoggerService } from './services/logger.service';
import { NavLink } from './interfaces/navlink';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isLoggedIn = false;
  public navLinks: NavLink[];

  private logo = 'GGGGGGGGGGGGG                 b::::::b            lllllll\                                           \r\nGGG:::::::::::\
  :G                 b::::::b            l:::::l                                           \r\nGG:::::::::::::::G         \
          b::::::b            l:::::l                                           \r\nG:::::GGGGGGGG::::G                  b\
  :::::b            l:::::l                                           \r\nG:::::G       GGGGGG  aaaaaaaaaaaaa   b:::::bbbb\
  bbbbb     l::::l uuuuuu    uuuuuu     mmmmmmm    mmmmmmm   \r\nG:::::G                a::::::::::::a  b::::::::::::::bb \
    l::::l u::::u    u::::u   mm:::::::m  m:::::::mm \r\nG:::::G                aaaaaaaaa:::::a b::::::::::::::::b  l::::l\
   u::::u    u::::u  m::::::::::mm::::::::::m\r\nG:::::G    GGGGGGGGGG           a::::a b:::::bbbbb:::::::b l::::l u::::u \
     u::::u  m::::::::::::::::::::::m\r\nG:::::G    G::::::::G    aaaaaaa:::::a b:::::b    b::::::b l::::l u::::u    u::::\
  u  m:::::mmm::::::mmm:::::m\r\nG:::::G    GGGGG::::G  aa::::::::::::a b:::::b     b:::::b l::::l u::::u    u::::u  m::::\
  m   m::::m   m::::m\r\nG:::::G        G::::G a::::aaaa::::::a b:::::b     b:::::b l::::l u::::u    u::::u  m::::m   m:::\
  :m   m::::m\r\nG:::::G       G::::Ga::::a    a:::::a b:::::b     b:::::b l::::l u:::::uuuu:::::u  m::::m   m::::m   m:::\
  :m\r\nG:::::GGGGGGGG::::Ga::::a    a:::::a b:::::bbbbbb::::::bl::::::lu:::::::::::::::uum::::m   m::::m   m::::m\r\nGG::\
  :::::::::::::Ga:::::aaaa::::::a b::::::::::::::::b l::::::l u:::::help::::::um::::m   m::::m   m::::m\r\nGGG::::::GGG:::\
  G a::::::::::aa:::ab:::::::::::::::b  l::::::l  uu::::::::uu:::um::::m   m::::m   m::::m\r\nGGGGGG   GGGG  aaaaaaaaaa  a\
  aaabbbbbbbbbbbbbbbb   llllllll    uuuuuuuu  uuuummmmmm   mmmmmm   mmmmmm\r\n                                            \
                              \r\n';
  constructor(
    private profile: ProfileDataService,
    private auth: AuthenticationService,
    private comms: CommunicatorService,
    private logger: LoggerService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.isLoggedIn = auth.getAuthenticated();
    this.comms.getMessages().subscribe(message => {
      if (message.dest === '@all') {
        const data = message.data;
        if ('authChanged' in data) {
          this.isLoggedIn = auth.getAuthenticated();
          if (!this.isLoggedIn) {
            this.navLinks = undefined;
            // this.router.navigate(['/']);
          } else {
            profile.getNavLinks('@all', 'navlinks');
          }
          this.logger.log(auth.getProfileData());
        }

        if ('navlinks' in data) {
          this.navLinks = data.navlinks;
          if (this.router.url === '/') {
            router.navigate(['/dashboard']);
          }
        }
      }
    });
  }

  sideNavToggle() {
  }

  ngOnInit() {
    this.profile.getUserProfileByEmail('@all', 'profile');
    console.log(this.logo);
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent, {
      width: '80%',
    });
  }

}
