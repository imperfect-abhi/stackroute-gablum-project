import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsListComponent } from './proposals-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('ProposalsListComponent', () => {
  let component: ProposalsListComponent;
  let fixture: ComponentFixture<ProposalsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalsListComponent ],
      imports: [HttpClientModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
