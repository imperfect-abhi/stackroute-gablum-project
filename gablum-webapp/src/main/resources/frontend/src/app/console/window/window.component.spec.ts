import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WindowComponent } from './window.component';
import { CdkPortal } from '@angular/cdk/portal';

describe('WindowComponent', () => {
  let component: WindowComponent;
  let fixture: ComponentFixture<WindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowComponent, CdkPortal
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
