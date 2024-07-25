import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingNegotiableInstrumentReviewerComponent } from './pending-negotiable-instrument-reviewer.component';

describe('PendingNegotiableInstrumentReviewerComponent', () => {
  let component: PendingNegotiableInstrumentReviewerComponent;
  let fixture: ComponentFixture<PendingNegotiableInstrumentReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingNegotiableInstrumentReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingNegotiableInstrumentReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
