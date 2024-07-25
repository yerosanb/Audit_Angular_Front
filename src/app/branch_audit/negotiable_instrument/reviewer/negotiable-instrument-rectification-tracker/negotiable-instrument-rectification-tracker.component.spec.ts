import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiableInstrumentRectificationTrackerComponent } from './negotiable-instrument-rectification-tracker.component';

describe('NegotiableInstrumentRectificationTrackerComponent', () => {
  let component: NegotiableInstrumentRectificationTrackerComponent;
  let fixture: ComponentFixture<NegotiableInstrumentRectificationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegotiableInstrumentRectificationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegotiableInstrumentRectificationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
