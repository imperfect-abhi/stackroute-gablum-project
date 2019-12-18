import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPageComponent } from './contract-page.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContractPageComponent', () => {
  let component: ContractPageComponent;
  let fixture: ComponentFixture<ContractPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPageComponent ],
      imports: [ HttpClientModule, MaterialModule, BrowserAnimationsModule, MaterialModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
