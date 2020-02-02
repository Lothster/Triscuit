import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriscuitTimerComponent } from './triscuit-timer.component';

describe('TriscuitTimerComponent', () => {
  let component: TriscuitTimerComponent;
  let fixture: ComponentFixture<TriscuitTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriscuitTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriscuitTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
