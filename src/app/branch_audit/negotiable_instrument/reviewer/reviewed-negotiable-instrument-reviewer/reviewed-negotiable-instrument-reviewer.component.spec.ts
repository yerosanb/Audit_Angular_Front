import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewedNegotiableInstrumentReviewerComponent } from './reviewed-negotiable-instrument-reviewer.component';

describe('ReviewedNegotiableInstrumentReviewerComponent', () => {
  let component: ReviewedNegotiableInstrumentReviewerComponent;
  let fixture: ComponentFixture<ReviewedNegotiableInstrumentReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewedNegotiableInstrumentReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewedNegotiableInstrumentReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
