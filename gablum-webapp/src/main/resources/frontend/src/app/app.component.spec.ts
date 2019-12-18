import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { MatToolbarModule, MatCardModule, MatFormFieldModule, MatButtonModule,
        MatRadioModule, MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppCommonModule } from './common/common.module';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.module';
import { TeamComponent } from './team/team.component';
import { NotFoundComponent } from './not-found/not-found.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatRadioModule,
        MatToolbarModule,
        ReactiveFormsModule,
        FormsModule,
        MatOptionModule,
        MatSelectModule,
        AppCommonModule,
        MaterialModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      declarations: [
        AppComponent,
        LandingPageComponent,
        LoginComponent,
        TeamComponent,
        NotFoundComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
