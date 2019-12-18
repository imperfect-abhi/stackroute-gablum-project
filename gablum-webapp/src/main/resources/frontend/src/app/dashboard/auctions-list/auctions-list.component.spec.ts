import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionsListComponent } from './auctions-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('AuctionsListComponent', () => {
  let component: AuctionsListComponent;
  let fixture: ComponentFixture<AuctionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ AuctionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
