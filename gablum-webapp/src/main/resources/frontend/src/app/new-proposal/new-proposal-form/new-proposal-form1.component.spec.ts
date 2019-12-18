import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProposalForm1Component } from './new-proposal-form1.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material/material.module';
describe('NewProposalForm1Component', () => {
  let component: NewProposalForm1Component;
  let fixture: ComponentFixture<NewProposalForm1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProposalForm1Component ],
      imports: [ BrowserAnimationsModule, ReactiveFormsModule, RouterTestingModule, MaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProposalForm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
