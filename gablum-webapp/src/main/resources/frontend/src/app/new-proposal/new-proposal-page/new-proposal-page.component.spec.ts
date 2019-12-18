import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProposalPageComponent } from './new-proposal-page.component';
import { ReactiveFormsModule, FormsModule, RequiredValidator } from '@angular/forms';
import { MatFormFieldModule, MatDialogModule, MatCell, MatFormFieldControl, MatInputModule } from '@angular/material';

describe('NewProposalPageComponent', () => {
  let component: NewProposalPageComponent;
  let fixture: ComponentFixture<NewProposalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProposalPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProposalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
