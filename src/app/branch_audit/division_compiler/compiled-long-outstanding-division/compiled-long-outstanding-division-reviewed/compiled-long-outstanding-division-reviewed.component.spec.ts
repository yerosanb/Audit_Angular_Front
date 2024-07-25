import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledLongOutstandingDivisionReviewedComponent } from './compiled-long-outstanding-division-reviewed.component';

describe('CompiledLongOutstandingDivisionReviewedComponent', () => {
  let component: CompiledLongOutstandingDivisionReviewedComponent;
  let fixture: ComponentFixture<CompiledLongOutstandingDivisionReviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledLongOutstandingDivisionReviewedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledLongOutstandingDivisionReviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
