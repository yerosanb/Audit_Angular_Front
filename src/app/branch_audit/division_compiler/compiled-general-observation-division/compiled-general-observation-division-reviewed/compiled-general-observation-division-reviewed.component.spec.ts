import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledGeneralObservationDivisionReviewedComponent } from './compiled-general-observation-division-reviewed.component';

describe('CompiledGeneralObservationDivisionReviewedComponent', () => {
  let component: CompiledGeneralObservationDivisionReviewedComponent;
  let fixture: ComponentFixture<CompiledGeneralObservationDivisionReviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledGeneralObservationDivisionReviewedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledGeneralObservationDivisionReviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
