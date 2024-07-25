import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledNegotiableInstrumentDivisionReviewedComponent } from './compiled-negotiable-instrument-division-reviewed.component';

describe('CompiledNegotiableInstrumentDivisionReviewedComponent', () => {
  let component: CompiledNegotiableInstrumentDivisionReviewedComponent;
  let fixture: ComponentFixture<CompiledNegotiableInstrumentDivisionReviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledNegotiableInstrumentDivisionReviewedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledNegotiableInstrumentDivisionReviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
